//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { Logger } from 'winston';
import { EventService } from '../../../../event-client/event.service';
import { AuthV1Service } from '../services/auth-v1-service';
import { AuthV2Service } from '../services/auth-v2.service';
import { AuthV1CookieService } from '../services/cookie-v1.service';
import { AuthV1AccessTokenService } from '../services/v1.access-token.service';
import { AuthV1RefreshTokenService } from '../services/v1.refresh-token.service';
import { AuthV1LoginResponse } from './models/AuthV1LoginResponse';

@Controller('/auth/v1')
@ApiTags('AuthV1')
export class V1UpgradeController {
  constructor(
    protected authService: AuthV1Service,
    protected authV2Service: AuthV2Service,
    protected cookieService: AuthV1CookieService,
    protected refreshTokenService: AuthV1RefreshTokenService,
    protected v2AccessTokenService: AuthV1AccessTokenService,
    protected events: EventService,
    @Inject('LOGGER') protected logger: Logger,
  ) {}

  @Get('/upgrade')
  @ApiResponse({
    status: 200,
    type: AuthV1LoginResponse,
  })
  public async upgradeOldToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthV1LoginResponse> {
    const deviceId = await this.authV2Service.getDeviceIdFromRequest(request);
    const nextUser = await this.authService.getCurrentUserFromRequest(request, deviceId);
    const token = await this.v2AccessTokenService.generateTokenForCurrentUser(nextUser, deviceId);
    const refreshToken = await this.refreshTokenService.generateTokenForCurrentUser(nextUser);

    this.cookieService.sendCookies(response, refreshToken, deviceId);

    return new AuthV1LoginResponse({
      token,
      refreshToken,
    });
  }
}
