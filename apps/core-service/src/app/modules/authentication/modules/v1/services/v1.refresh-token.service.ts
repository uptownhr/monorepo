//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { DEVICEID_COOKIE_KEY, isJwtPayload, isV2MasqToken, TokenType, V2CurrentUser } from '@bambeehr/authentication';
import { Cookies } from '@bambeehr/consts';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import type { Tags } from 'hot-shots';
import * as HttpErrors from 'http-errors';
import statClient from '../../../../../lib/stats';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { AuthServiceRepository } from '../../../repositories/auth-service.repository';
import jwt = require('jsonwebtoken');
import winston = require('winston');

interface JWTPayload {
  userId: string;
  authId: string;
  companyId?: string;
}

interface MasqJWTPayload extends JWTPayload {
  masq: JWTPayload;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMasqPayload(claim: any): claim is MasqJWTPayload {
  return (
    Object.prototype.hasOwnProperty.call(claim, 'masq') && Object.prototype.hasOwnProperty.call(claim.masq, 'userId')
  );
}

@Injectable()
export class AuthV1RefreshTokenService {
  constructor(
    protected configService: ConfigService,
    protected authRepo: AuthServiceRepository,
    @Inject('LOGGER') protected logger: winston.Logger,
  ) {}

  async verifyToken(token: string, request: Request): Promise<V2CurrentUser> {
    if (!token) {
      statClient.increment('refresh-token.401', { reason: 'token is null', origin: request.headers?.origin } as Tags);
      this.logger.warn('Error Verifying Refresh Token', {
        message: 'Token is Null',
        origin: request.headers?.origin,
      });
      throw new HttpErrors[401]('Error Verifying Refresh token');
    }

    // use the v1 lookup here to verify, using the claim auth id and password.
    const claim = jwt.decode(token);

    if (!isJwtPayload(claim)) {
      statClient.increment('refresh-token.401', {
        reason: 'token is invalid',
        origin: request.headers?.origin,
      } as Tags);
      this.logger?.warn('Refresh Token Claim is invalid', {
        claim,
        token,
        origin: request.headers?.origin,
      });
      throw new HttpErrors[401]('Refresh Token Claim is invalid.');
    }

    if (
      process.env.AUTH_ENABLE_DEVICEID_COOKIE === 'true' ||
      request.cookies?.[Cookies.AUTH_ENABLE_DEVICEID.KEY] === Cookies.AUTH_ENABLE_DEVICEID.VALUE
    ) {
      const deviceIdCookie = request?.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;
      if (!deviceIdCookie) {
        statClient.increment('refresh-token.401', {
          reason: 'no deviceid cookie',
          origin: request.headers?.origin,
        } as Tags);
        this.logger?.warn('No deviceid cookie', {
          token,
          envSet: process.env.AUTH_ENABLE_DEVICEID_COOKIE === 'true',
          cookieSet: request.cookies?.[Cookies.AUTH_ENABLE_DEVICEID.KEY] === Cookies.AUTH_ENABLE_DEVICEID.VALUE,
          cookies: request.cookies,
          signedCookies: request.signedCookies,
          origin: request.headers?.origin,
        });
        throw new HttpErrors[401]('Refresh Token Claim is invalid.');
      }

      if (typeof deviceIdCookie !== 'string') {
        statClient.increment('refresh-token.401', { reason: 'bad cookies', origin: request.headers?.origin } as Tags);
        this.logger?.warn('Bad deviceid cookie', {
          token,
          envSet: process.env.AUTH_ENABLE_DEVICEID_COOKIE === 'true',
          cookieSet: request.cookies?.[Cookies.AUTH_ENABLE_DEVICEID.KEY] === Cookies.AUTH_ENABLE_DEVICEID.VALUE,
          cookies: request.cookies,
          signedCookies: request.signedCookies,
          origin: request.headers?.origin,
        });
        throw new HttpErrors[401]('Refresh Token Claim is invalid.');
      }
    }

    if (isMasqPayload(claim)) {
      return this.#verifyMasqUser(request, token, claim);
    } else {
      return this.#verifyBaseUser(request, token, claim);
    }
  }

  /**
   * Creates cookies needed for device identification and refresh tokens.
   * Per spec, cookie names are case-insensitive.
   * @param refreshToken
   * @param deviceId
   */
  generateTokenForCurrentUser(currentUser: V2CurrentUser) {
    if (isV2MasqToken(currentUser)) {
      return this.generateForMasqUser(currentUser as Required<V2CurrentUser>);
    } else {
      return this.generateForBaseUser(currentUser);
    }
  }

  async generateForBaseUser(cu: V2CurrentUser): Promise<string> {
    const payload = {
      authId: cu.authId,
      userId: cu.userId,
      companyId: cu.companyId,
    };
    const dto = await this.authRepo.findByAuthId(cu.authId);
    if (!dto) {
      throw new HttpErrors.Unauthorized('Error generating token: auth|user is null');
    }
    return this.generateToken(payload, dto);
  }

  async generateForMasqUser(cu: Required<V2CurrentUser>): Promise<string> {
    const payload = {
      authId: cu.authId,
      userId: cu.userId,
      companyId: cu.companyId,
      masq: {
        authId: cu.masquerade.authId,
        userId: cu.masquerade.userId,
      },
    };

    const dto = await this.authRepo.findByAuthId(cu.masquerade.authId);
    if (!dto) {
      throw new HttpErrors.Unauthorized('Error generating token: auth|user is null');
    }
    return this.generateToken(payload, dto);
  }

  async generateToken(userProfile: JWTPayload | MasqJWTPayload, dto: AuthUserDTO): Promise<string> {
    const jwtSecret = this.configService.get<string>('authentication.refresh.v1Secret');
    const expiresIn = this.configService.get<string>('authentication.refresh.expiresIn');

    if (!userProfile) {
      statClient.increment('refresh-token.401', {
        reason: 'profile is null',
      } as Tags);
      throw new HttpErrors.Unauthorized('Error generating token: userProfile is null');
    }

    return jwt.sign({ userId: userProfile.userId, authId: userProfile.authId }, dto.passwordHash + jwtSecret, {
      expiresIn,
    });
  }

  async #verifyBaseUser(request: Request, token: string, claim: JWTPayload): Promise<V2CurrentUser> {
    const userDto = await this.#loadUserFromCliams(claim.authId, claim.userId, token, claim.companyId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let decoded: any;
    try {
      const jwtSecret = this.configService.get<string>('authentication.refresh.v1Secret');
      decoded = jwt.verify(token, userDto.passwordHash + jwtSecret);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      statClient.increment('refresh-token.401', { reason: e.message } as Tags);
      this.logger?.warn('_verifyBaseUser: verify failure', {
        claim,
        message: e.message,
        token,
      });
      throw new HttpErrors[401]('Claim is invalid.');
    }

    if (!isJwtPayload(decoded)) {
      statClient.increment('refresh-token.401', {
        reason: 'bad claim',
      } as Tags);
      this.logger?.warn('_verifyBaseUser: not a jwt', {
        claim,
        decoded,
        token,
      });
      throw new HttpErrors[401]('Claim is invalid.');
    }

    const deviceId = request?.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;

    return {
      tokenType: TokenType.JWTv2,
      email: userDto.email,
      name: userDto.fullName,
      authId: userDto.id,
      userId: userDto.currentUserId,
      companyId: userDto.currentCompanyId,
      roles: userDto.roles,

      // special private fields just for token generation.
      deviceId,
    };
  }

  async #verifyMasqUser(request: Request, token: string, claim: MasqJWTPayload): Promise<V2CurrentUser> {
    const [userDto, masqDto] = await Promise.all([
      this.#loadUserFromCliams(claim.authId, claim.userId, token, claim.companyId),
      this.#loadUserFromCliams(claim.masq.authId, claim.masq.userId, token, claim.masq.companyId),
    ]);

    const roles = userDto.roles;

    const deviceId = request?.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;
    return {
      tokenType: TokenType.MasqV2,
      email: userDto.email,
      name: userDto.fullName,
      authId: userDto.id,
      userId: userDto.currentUserId,
      companyId: userDto.currentCompanyId,
      roles,
      deviceId,
      masquerade: {
        email: masqDto.email,
        name: masqDto.fullName,
        authId: masqDto.id,
        userId: masqDto.currentUserId,
        companyId: masqDto.currentCompanyId,
        roles: masqDto.roles,
      },
    };
  }

  async #loadUserFromCliams(authId: string, userId: string, token: string, companyId?: string) {
    const dto = await this.authRepo.findByUserId(userId);

    if (!dto) {
      statClient.increment('refresh-token.401', {
        reason: 'user not found',
      } as Tags);
      this.logger?.warn('loadUserFromClaim: user not found', {
        userId,
        authId,
        token,
      });
      throw new HttpErrors[401]('Refresh Token Claim is invalid.');
    }

    if (!dto.currentUserActive || !dto.active) {
      throw new HttpErrors[401]('Auth/User is not active');
    }
    return dto;
  }
}
