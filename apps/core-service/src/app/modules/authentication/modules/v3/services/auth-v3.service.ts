//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import {
  BaseUser,
  DEVICEID_COOKIE_KEY,
  getCurrentUserForRequest,
  isV3MasqToken,
  REFRESHTOKEN_COOKIE_KEY,
  TokenType,
} from '@bambeehr/authentication';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { add } from 'date-fns';
import type { Request, Response } from 'express';
import * as HttpErrors from 'http-errors';
import * as UIDGenerator from 'uid-generator';
import type { Logger } from 'winston';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { AuthServiceRepository } from '../../../repositories/auth-service.repository';
import { LoginChallengeService } from '../../mfa/services';
import type { AuthV3MfaChallengeRequestBody } from '../controllers/models/AuthV3MfaChallengeRequestBody';
import type { AuthV3RefreshRequestBody } from '../controllers/models/AuthV3RefreshRequestBody';
import { AuthV3TokenBody } from '../controllers/models/AuthV3TokenBody';
import { MasqueradeV3Response } from '../controllers/models/MasqueradeV3Response';
import type { NonceV3GenerateResponse } from '../controllers/models/NonceV3GenerateResponse';
import { BASE_URL } from '../lib/base-url';
import { isJwtPayload } from '../types/JWTPayload';
import { TokenV3Service } from './token-v3.service';

@Injectable()
export class AuthV3Service {
  nodeEnv = process.env.NODE_ENV ?? 'dev';
  primaryDomain = process.env.PRIMARY_DOMAIN ?? 'local.bambee.com';

  constructor(
    protected authRepo: AuthServiceRepository,
    protected tokenService: TokenV3Service,
    @Inject(LoginChallengeService) private readonly loginChallengeService: LoginChallengeService,
    @Inject('LOGGER') protected logger: Logger,
  ) {}
  async getOrCreateDeviceIdFromRequest(request: Request, create = true): Promise<string> {
    const deviceIdCookie = request.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;

    if (deviceIdCookie) {
      return deviceIdCookie as unknown as string;
    } else {
      if (!create) {
        throw new Error('No device id found');
      }
      return new UIDGenerator(256, UIDGenerator.BASE94).generate();
    }
  }
  async oauthComplete(request: Request, response: Response, provider: string, email: string) {
    const dto = await this.#getAuthForEmail(email);
    let deviceId: string;

    const deviceIdCookie = request.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;

    if (deviceIdCookie) {
      deviceId = deviceIdCookie as unknown as string;
    } else {
      deviceId = await new UIDGenerator(256, UIDGenerator.BASE94).generate();
    }

    const accessToken = await this.tokenService.generateAccessToken(dto, deviceId);
    const refreshToken = await this.tokenService.generateRefreshToken(dto);

    this.#_sendCookies(response, refreshToken.value, deviceId);
    return new AuthV3TokenBody({
      id: dto.id,
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      baseUrl: BASE_URL,
      expiration: accessToken.expiration,
    });
  }

  async login(
    request: Request,
    response: Response,
    email: string,
    password: string,
    origin?: string,
    remoteForward?: string,
    mfa?: AuthV3MfaChallengeRequestBody,
  ): Promise<AuthV3TokenBody | NonceV3GenerateResponse> {
    const dto = await this.#getAuthForCredentials(email, password);

    /**
     * Warning!!!
     * At this point, we have already validated the users credentials, but we may still need to
     * perform additional checks.
     *
     * Be careful with what you do here.
     */

    let deviceId: string;

    const deviceIdCookie = request.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;

    if (deviceIdCookie) {
      deviceId = deviceIdCookie as unknown as string;
      this.logger.debug(`Logging in with existing device id`, {
        email,
        deviceId,
      });
    } else {
      deviceId = await new UIDGenerator(256, UIDGenerator.BASE94).generate();
      this.logger.debug(`Logging in with a NEW device id`, {
        email,
        deviceId,
      });
    }

    const challengeResponse = await this.loginChallengeService.handleLoginChallenge(
      request,
      response,
      dto,
      deviceId,
      mfa,
    );
    if (challengeResponse) {
      return challengeResponse;
    }

    const accessToken = await this.tokenService.generateAccessToken(dto, deviceId);
    const refreshToken = await this.tokenService.generateRefreshToken(dto);

    this.#_sendCookies(response, refreshToken.value, deviceId);

    // eslint-disable-next-line no-void
    void origin;
    // eslint-disable-next-line no-void
    void remoteForward;

    return new AuthV3TokenBody({
      id: dto.id,
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      baseUrl: BASE_URL,
      expiration: accessToken.expiration,
    });
  }

  async refresh(request: Request, response: Response, body?: AuthV3RefreshRequestBody): Promise<AuthV3TokenBody> {
    const refreshTokenValue =
      body?.refreshToken ?? request.signedCookies?.[REFRESHTOKEN_COOKIE_KEY] ?? request.signedCookies?.refreshtoken;
    if (!refreshTokenValue || typeof refreshTokenValue !== 'string') {
      throw new HttpErrors[401]('Missing Refresh Token');
    }

    const deviceId = request.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;
    if (!deviceId || typeof deviceId !== 'string') {
      throw new HttpErrors[401]('Missing Device ID');
    }

    const authClaim = await getCurrentUserForRequest(
      request,
      { decodeOnly: true },
      TokenType.JWTv2,
      TokenType.JWTv3,
      TokenType.MasqV2,
      TokenType.MasqV3,
    );
    const refreshClaim = this.tokenService.decodeAccessToken(refreshTokenValue);

    if (!isJwtPayload(refreshClaim)) {
      throw new HttpErrors[401]('Invalid Claim');
    }

    if (isV3MasqToken(authClaim)) {
      const dto = await this.#getAuthForUserIdClaim(refreshClaim.userId);
      const realDto = await this.#getAuthForUserIdClaim(authClaim.masquerade.authId);

      this.tokenService.verifyRefreshToken(refreshTokenValue, realDto?.passwordHash as string);

      const accessToken = await this.tokenService.generateMasqAccessToken(authClaim, dto);
      const refreshToken = await this.tokenService.generateRefreshToken(realDto);

      this.#_sendCookies(response, refreshToken.value, deviceId);

      return new AuthV3TokenBody({
        id: dto.id,
        accessToken: accessToken.value,
        refreshToken: refreshToken.value,
        baseUrl: BASE_URL,
        expiration: accessToken.expiration,
      });
    } else {
      const dto = await this.#getAuthForUserIdClaim(refreshClaim.userId);
      this.tokenService.verifyRefreshToken(refreshTokenValue, dto.passwordHash as string);

      const accessToken = await this.tokenService.generateAccessToken(dto, deviceId);
      const refreshToken = await this.tokenService.generateRefreshToken(dto);

      this.#_sendCookies(response, refreshToken.value, deviceId);

      return new AuthV3TokenBody({
        id: dto.id,
        accessToken: accessToken.value,
        refreshToken: refreshToken.value,
        baseUrl: BASE_URL,
        expiration: accessToken.expiration,
      });
    }
  }

  /**
   * Masquerade tokens are NOT refreshable.
   * @param currentUser
   * @param userId
   */
  async getMasqToken(currentUser: BaseUser, userId: string): Promise<MasqueradeV3Response> {
    const dto = await this.#getAuthForUserIdClaim(userId);
    const token = await this.tokenService.generateMasqAccessToken(currentUser, dto);
    return new MasqueradeV3Response({
      accessToken: token.value,
      expiration: token.expiration,
    });
  }

  async switchUser(
    request: Request,
    response: Response,
    currentUser: BaseUser,
    userId: string,
  ): Promise<AuthV3TokenBody> {
    const deviceId = request.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;

    if (!deviceId || typeof deviceId !== 'string') {
      throw new HttpErrors[401]('Missing Device ID');
    }

    const newDto = await this.authRepo.changeActiveUserAuth(currentUser.authId, userId);

    const accessToken = await this.tokenService.generateAccessToken(newDto, deviceId);
    const refreshToken = await this.tokenService.generateRefreshToken(newDto);

    this.#_sendCookies(response, refreshToken.value, deviceId);

    return new AuthV3TokenBody({
      id: newDto.id,
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      baseUrl: BASE_URL,
      expiration: accessToken.expiration,
    });
  }

  async switchCompany(
    request: Request,
    response: Response,
    currentUser: BaseUser,
    companyId: string,
  ): Promise<AuthV3TokenBody> {
    const deviceId = request.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;

    if (!deviceId || typeof deviceId !== 'string') {
      throw new HttpErrors[401]('Missing Device ID');
    }

    const newDto = await this.authRepo.changeActiveCompanyAuth(currentUser.authId, companyId);

    const accessToken = await this.tokenService.generateAccessToken(newDto, deviceId);
    const refreshToken = await this.tokenService.generateRefreshToken(newDto);

    this.#_sendCookies(response, refreshToken.value, deviceId);

    return new AuthV3TokenBody({
      id: newDto.id,
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
      baseUrl: BASE_URL,
      expiration: accessToken.expiration,
    });
  }

  async #getAuthForCredentials(email: string, password: string) {
    const dto = await this.#getAuthForEmail(email);
    if (!dto.passwordHash || dto.passwordHash === '' || dto.passwordHash === 'invalid') {
      throw new HttpErrors[401]('Auth Record cannot be logged in');
    }

    const validPassword = await bcrypt.compare(password, dto.passwordHash);

    if (!validPassword) {
      throw new HttpErrors[401]('Invalid Password');
    }

    if (!dto.active || !dto.currentUserActive) {
      throw new HttpErrors[403]('Account is Inactive');
    }

    return dto;
  }

  async #getAuthForEmail(email: string): Promise<AuthUserDTO> {
    const dto = await this.authRepo.findByEmail(email);

    if (!dto) {
      throw new HttpErrors[404](`Invalid User ${email}`);
    }
    return dto;
  }

  async #getAuthForUserIdClaim(userId: string): Promise<AuthUserDTO> {
    const dto = await this.authRepo.findByUserId(userId);

    if (!dto) {
      throw new HttpErrors[404](`Invalid User ${userId}`);
    }
    if (!dto.active || !dto.currentUserActive) {
      throw new HttpErrors[401]('User not active');
    }
    return dto;
  }

  #_sendCookies(response: Response, refreshToken: string, deviceId?: string) {
    const isStrict = process.env.BAMBEE_ENV?.includes('production');
    response.cookie(REFRESHTOKEN_COOKIE_KEY, refreshToken, {
      secure: this.nodeEnv !== 'test',
      httpOnly: this.nodeEnv !== 'test',
      expires: add(new Date(), { days: 60 }),
      signed: true,
      /* istanbul ignore next */
      domain: this.nodeEnv !== 'test' ? '.' + this.primaryDomain : '127.0.0.1',
      path: '/',
      sameSite: isStrict ? 'strict' : 'none',
    });

    /* istanbul ignore else */
    if (deviceId) {
      response.cookie(DEVICEID_COOKIE_KEY, deviceId, {
        secure: this.nodeEnv !== 'test',
        expires: new Date(2147483647 * 1000),
        httpOnly: this.nodeEnv !== 'test',
        signed: true,
        /* istanbul ignore next */
        domain: this.nodeEnv !== 'test' ? '.bambee.com' : '127.0.0.1',
        path: '/',
        sameSite: isStrict ? 'strict' : 'none',
      });
    }
  }
}
