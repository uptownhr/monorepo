//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { V2CurrentUser } from '@bambeehr/authentication';
import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { EventService } from '../../../../event-client/event.service';
import { AuthV2Service } from '../services/auth-v2.service';
import { AuthV1CookieService } from '../services/cookie-v1.service';
import { AuthV1AccessTokenService } from '../services/v1.access-token.service';
import { AuthV1RefreshTokenService } from '../services/v1.refresh-token.service';
import { AuthV1LoginBody } from './models/AuthV1LoginBody';
import { AuthV1LoginResponse } from './models/AuthV1LoginResponse';
import type { NonceV1GenerateResponse } from './models/NonceV1GenerateResponse';

@Controller('/auth/v1')
@ApiTags('AuthV1')
export class V1AuthController {
  constructor(
    protected authService: AuthV2Service,
    protected cookieService: AuthV1CookieService,
    protected refreshTokenService: AuthV1RefreshTokenService,
    protected v2AccessTokenService: AuthV1AccessTokenService,
    protected events: EventService,
  ) {}

  @Post('/login')
  @ApiResponse({
    status: 200,
    type: AuthV1LoginResponse,
  })
  public async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: AuthV1LoginBody,
    @Headers('origin') origin?: string,
    @Headers('x-forwarded-for') forwardRemote?: string,
  ): Promise<AuthV1LoginResponse | NonceV1GenerateResponse> {
    const deviceId = await this.authService.getDeviceIdFromRequest(request);
    const nextUser = await this.authService.getCurrentUserForCredentials(
      request,
      response,
      body.email,
      body.password,
      deviceId,
      body.mfa,
    );
    if (!isCurrentUser(nextUser)) {
      this.cookieService.sendCookies(response, undefined, deviceId);
      return nextUser;
    } else {
      const token = await this.v2AccessTokenService.generateTokenForCurrentUser(nextUser, deviceId);
      const refreshToken = await this.refreshTokenService.generateTokenForCurrentUser(nextUser);

      this.cookieService.sendCookies(response, refreshToken, deviceId);

      await this.events.userLogin({
        userId: nextUser.userId,
        ipAddress: forwardRemote ?? request.connection.remoteAddress ?? 'unknown',
        origin: origin ?? 'unknown',
        timeStamp: Date.now(),
      });

      return new AuthV1LoginResponse({
        token,
        refreshToken,
      });
    }
  }
}

function isCurrentUser(r: NonceV1GenerateResponse | V2CurrentUser): r is V2CurrentUser {
  return Object.prototype.hasOwnProperty.call(r, 'userId');
}
