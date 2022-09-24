//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, DEVICEID_COOKIE_KEY, TokenType, V2CurrentUser } from '@bambeehr/authentication';
import { Cookies } from '@bambeehr/consts';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import * as HttpErrors from 'http-errors';
import type { TokenSet, UserinfoResponse } from 'openid-client';
import { EventService } from '../../../../event-client/event.service';
import { ANALYTICS_KEY } from '../../../../event-client/keys';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { AuthServiceRepository } from '../../../repositories/auth-service.repository';
import { LoginChallengeService } from '../../mfa/services';
import { SITE_HOST } from '../../v3/lib/base-url';
import type { AuthV1MfaChallengeRequestBody } from '../controllers/models/AuthV1MfaChallengeRequestBody';
import { AuthV1AccessTokenService } from './v1.access-token.service';
import UIDGenerator = require('uid-generator');
import Analytics = require('analytics-node');

@Injectable()
export class AuthV2Service {
  constructor(
    protected authRepo: AuthServiceRepository,
    private tokenService: AuthV1AccessTokenService,
    protected events: EventService,
    @Inject(LoginChallengeService) private readonly loginChallengeService: LoginChallengeService,
    @Inject(ANALYTICS_KEY) protected segment: Analytics,
  ) {}

  async oauthComplete(
    request: Request,
    response: Response,
    provider: string,
    tokenSet: TokenSet,
    userInfo: UserinfoResponse,
    deviceId: string,
  ): Promise<V2CurrentUser> {
    const dto = await this.#getAuthForEmail(userInfo.email!);

    // update
    await this.authRepo.updateOauthTokens(dto.id, provider, tokenSet, userInfo);
    return this.#currentUserForDto(dto, deviceId);
  }

  public async getCurrentUserForCredentials(
    request: Request,
    response: Response,
    username: string,
    password: string,
    deviceId: string,
    mfa?: AuthV1MfaChallengeRequestBody,
  ) {
    const dto = await this.#getAuthForCredentials(username, password);
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
    return this.#currentUserForDto(dto, deviceId);
  }

  async switchUser(currentUser: CurrentUser, userId: string, deviceId: string): Promise<V2CurrentUser> {
    const newDto = await this.authRepo.changeActiveUserAuth(currentUser.authId, userId);
    return this.#currentUserForDto(newDto, deviceId);
  }

  async switchCompany(currentUser: CurrentUser, companyId: string, deviceId: string): Promise<V2CurrentUser> {
    const newDto = await this.authRepo.changeActiveCompanyAuth(currentUser.authId, companyId);
    return this.#currentUserForDto(newDto, deviceId);
  }

  async getDeviceIdFromRequest(request: Request, throwMissing = false): Promise<string> {
    const cookie = request?.signedCookies?.[DEVICEID_COOKIE_KEY] ?? request.signedCookies?.deviceid;
    if (cookie) {
      return cookie as unknown as string;
    } else {
      if (
        throwMissing &&
        (process.env.AUTH_ENABLE_DEVICEID_COOKIE === 'true' ||
          request.cookies?.[Cookies.AUTH_ENABLE_DEVICEID.KEY] === Cookies.AUTH_ENABLE_DEVICEID.VALUE)
      ) {
        throw new HttpErrors[401]('Missing secure deviceID');
      } else {
        return new UIDGenerator(256, UIDGenerator.BASE94).generate();
      }
    }
  }

  async forgotPassword(emailAddress: string) {
    const dto = await this.authRepo.findByEmail(emailAddress);
    if (dto) {
      // emit an event
      const token = await this.tokenService.getResetPasswordToken(dto.id);
      await this.authRepo.applyResetPasswordState(dto.id, token);
      await this.events.fullIdentify(dto.currentUserId);

      this.segment?.track({
        event: 'request-password-reset',
        userId: dto.currentUserId,
        properties: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          site_host: SITE_HOST,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          reset_token: token,
          category: 'app',
          label: 'forgot-password',
        },
      });
    }
  }

  async #getAuthForCredentials(username: string, password: string) {
    const dto = await this.#getAuthForUsername(username);
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

  async #getAuthForEmail(username: string): Promise<AuthUserDTO> {
    const dto = await this.authRepo.findByEmail(username);

    if (!dto) {
      throw new HttpErrors[404](`Invalid User ${username}`);
    }
    return dto;
  }

  async #getAuthForUsername(username: string): Promise<AuthUserDTO> {
    const dto = await this.authRepo.findByUsername(username);

    if (!dto) {
      throw new HttpErrors[404](`Invalid User ${username}`);
    }
    return dto;
  }

  async #currentUserForDto(dto: AuthUserDTO, deviceId: string): Promise<V2CurrentUser> {
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
}
