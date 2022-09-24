//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { REFRESHTOKEN_COOKIE_KEY } from '@bambeehr/authentication';
import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import * as HttpErrors from 'http-errors';
import { Logger } from 'winston';
import statClient from '../../../../../lib/stats';
import { EventService } from '../../../../event-client/event.service';
import { AuthV2Service } from '../services/auth-v2.service';
import { AuthV1CookieService } from '../services/cookie-v1.service';
import { AuthV1AccessTokenService } from '../services/v1.access-token.service';
import { AuthV1RefreshTokenService } from '../services/v1.refresh-token.service';
import { AuthV1LoginResponse } from './models/AuthV1LoginResponse';
import { AuthV1RefreshRequestBody } from './models/AuthV1RefreshBody';
@Controller('/auth/v1')
@ApiTags('AuthV1')
export class V1RefreshController {
  constructor(
    protected authService: AuthV2Service,
    protected cookieService: AuthV1CookieService,
    protected refreshTokenService: AuthV1RefreshTokenService,
    protected v2AccessTokenService: AuthV1AccessTokenService,
    protected events: EventService,
    @Inject('LOGGER') protected logger: Logger,
  ) {}

  @Post('/refresh')
  @ApiResponse({
    status: 200,
    type: AuthV1LoginResponse,
  })
  public async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body?: AuthV1RefreshRequestBody,
  ): Promise<AuthV1LoginResponse> {
    const authCookie =
      body?.refreshToken ?? request.signedCookies[REFRESHTOKEN_COOKIE_KEY] ?? request.signedCookies.refreshtoken;

    if (!authCookie || typeof authCookie !== 'string') {
      this.logger?.warn('Missing refresh token', {
        cookies: request.cookies,
        signedCookies: request.signedCookies,
        origin: request.headers?.origin,
      });
      statClient.increment('refresh-token.401', { reason: 'missing refresh cookie' });
      throw new HttpErrors[401]('Missing Refresh Token');
    }

    const deviceId = await this.authService.getDeviceIdFromRequest(request);
    const nextUser = await this.refreshTokenService.verifyToken(authCookie, request);
    const token = await this.v2AccessTokenService.generateTokenForCurrentUser(nextUser, deviceId);
    const refreshToken = await this.refreshTokenService.generateTokenForCurrentUser(nextUser);

    this.cookieService.sendCookies(response, refreshToken, deviceId);

    return new AuthV1LoginResponse({
      token,
      refreshToken,
    });
  }
}
