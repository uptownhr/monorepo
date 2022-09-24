//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { TokenType, V2CurrentUser } from '@bambeehr/authentication';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import * as HttpErrors from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { Logger } from 'winston';
import statClient from '../../../../../lib/stats';
import { AuthServiceRepository } from '../../../repositories/auth-service.repository';

interface JWTPayload {
  user_id: string;
}
interface MasqJwtPayload extends JWTPayload {
  masq_id: string;
  aud: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMasqJwt(claim: any): claim is MasqJwtPayload {
  return (
    Object.prototype.hasOwnProperty.call(claim, 'user_id') &&
    Object.prototype.hasOwnProperty.call(claim, 'masq_id') &&
    Object.prototype.hasOwnProperty.call(claim, 'aud') &&
    claim.aud === 'masq'
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isJwtPayload(claim: any): claim is JWTPayload {
  return Object.prototype.hasOwnProperty.call(claim, 'user_id');
}

@Injectable()
export class AuthV1Service {
  constructor(
    protected authRepo: AuthServiceRepository,
    protected configService: ConfigService,
    @Inject('LOGGER') protected logger: Logger,
  ) {}

  public async getCurrentUserFromRequest(request: Request, deviceId) {
    const token = this.#getTokenFromRequest(request);

    if (!token) {
      statClient.increment('access-token-v1.401', { reason: 'token is null' });
      throw new HttpErrors[401]('Error Verifying Token');
    }
    const claim = jwt.decode(token);

    if (!isJwtPayload(claim)) {
      this.logger?.debug('Claim is invalid', {
        token,
        claim,
      });
      statClient.increment('access-token-v1.401', { reason: 'invalid format' });
      throw new HttpErrors[401]('Claim is invalid.');
    }

    if (isMasqJwt(claim)) {
      return this.#getCurrentUserForMasq(token, claim, deviceId);
    } else {
      return this.#getCurrentUserForJwt(token, claim, deviceId);
    }
  }

  async #getCurrentUserForMasq(token, claim, deviceId): Promise<Required<V2CurrentUser>> {
    const [userDto, masqDto] = await Promise.all([
      this.authRepo.findByAuthId(claim.user_id),
      this.authRepo.findByAuthId(claim.masq_id),
    ]);

    if (!userDto) {
      statClient.increment('access-token-v1.401', { reason: 'auth not found' });
      throw new HttpErrors[401]('Claim is invalid.');
    }

    if (!masqDto) {
      statClient.increment('access-token-v1.401', { reason: 'auth not found' });
      throw new HttpErrors[401]('Claim is invalid.');
    }

    const masqSecret = this.configService.get<string>('authentication.masquerade.v1Secret');
    if (!masqSecret) {
      throw new Error('JWT signature is null');
    }
    try {
      // the token is signed using the base64 encoded secret
      jwt.verify(token, Buffer.from(masqSecret!, 'base64'));
    } catch (e) {
      if (e instanceof Error) {
        this.logger?.debug('Claim is invalid', {
          token,
          claim,
          message: e.message,
        });
        statClient.increment('access-token-v1.401', { reason: e.message });
      }
      throw new HttpErrors[401]('Claim is invalid.');
    }

    return {
      authId: userDto.id,
      email: userDto.email,
      name: userDto.fullName,
      roles: userDto.roles,
      userId: userDto.currentUserId,
      companyId: userDto.currentCompanyId!,
      deviceId,
      tokenType: TokenType.JWTv2,
      masquerade: {
        authId: masqDto.id,
        userId: masqDto.currentUserId,
        email: masqDto.email,
        name: masqDto.fullName,
        roles: masqDto.roles,
      },
    };
  }

  async #getCurrentUserForJwt(token, claim, deviceId): Promise<V2CurrentUser> {
    const dto = await this.authRepo.findByAuthId(claim.user_id);
    if (!dto) {
      statClient.increment('access-token-v1.401', { reason: 'auth not found' });
      throw new HttpErrors[401]('Claim is invalid.');
    }

    const jwtSecret = this.configService.get<string>('authentication.jwt.v1Secret');
    try {
      jwt.verify(token, jwtSecret!);
    } catch (e) {
      if (e instanceof Error) {
        this.logger?.debug('Claim is invalid', {
          token,
          claim,
          message: e.message,
        });
        statClient.increment('access-token-v1.401', { reason: e.message });
      }
      throw new HttpErrors[401]('Claim is invalid.');
    }

    return {
      authId: dto.id,
      email: dto.email,
      name: dto.fullName,
      roles: dto.roles,
      userId: dto.currentUserId,
      companyId: dto.currentCompanyId,
      deviceId,
      tokenType: TokenType.JWTv2,
    };
  }

  #getTokenFromRequest(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      statClient.increment('access-token-v1.401', { reason: 'missing authorization header' });
      throw new HttpErrors[401]('Missing Authorization header');
    }

    if (!authHeader.startsWith('Bearer')) {
      statClient.increment('access-token-v1.401', { reason: 'invalid authorization header' });
      throw new HttpErrors[401]('Authorization header is no a Bearer token.');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      statClient.increment('access-token-v1.401', { reason: 'bad bearer token' });
      throw new HttpErrors[401]('Invalid Bearer token format');
    }

    return parts[1];
  }
}
