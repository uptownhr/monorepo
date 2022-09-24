//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, TokenType } from '@bambeehr/authentication';
import { AuthUser, BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import * as HttpErrors from 'http-errors';
import { EventService } from '../../../../event-client/event.service';
import { AuthV2Service } from '../services/auth-v2.service';
import { AuthV1CookieService } from '../services/cookie-v1.service';
import { AuthV1AccessTokenService } from '../services/v1.access-token.service';
import { AuthV1RefreshTokenService } from '../services/v1.refresh-token.service';
import { AuthV1LoginResponse } from './models/AuthV1LoginResponse';
import { AuthV1SwitchCompanyBody } from './models/AuthV1SwitchCompanyBody';
import { AuthV1SwitchUserBody } from './models/AuthV1SwitchUserBody';

@Controller('/auth/v1')
@ApiTags('AuthV1')
@UseGuards(BambeeAuthGuard(TokenType.JWTv2, TokenType.MasqV2))
export class V1SwitchUserController {
  constructor(
    protected authService: AuthV2Service,
    protected cookieService: AuthV1CookieService,
    protected refreshTokenService: AuthV1RefreshTokenService,
    protected v2AccessTokenService: AuthV1AccessTokenService,
    protected events: EventService,
  ) {}

  @Post('/switch/user')
  @ApiResponse({
    status: 200,
    type: AuthV1LoginResponse,
  })
  public async switchUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: AuthV1SwitchUserBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<AuthV1LoginResponse> {
    const userId = body.userId || body.userMngId;
    if (!userId) {
      throw new HttpErrors[400]('Missing userId or userMngId');
    }
    const deviceId = await this.authService.getDeviceIdFromRequest(request);
    const nextUser = await this.authService.switchUser(currentUser, userId, deviceId);

    const token = await this.v2AccessTokenService.generateTokenForCurrentUser(nextUser, deviceId);
    const refreshToken = await this.refreshTokenService.generateTokenForCurrentUser(nextUser);

    this.cookieService.sendCookies(response, refreshToken, deviceId);

    return new AuthV1LoginResponse({
      token,
      refreshToken,
    });
  }

  @Post('/switch/company')
  @ApiResponse({
    status: 200,
    type: AuthV1LoginResponse,
  })
  public async switchCompany(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: AuthV1SwitchCompanyBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<AuthV1LoginResponse> {
    const companyId = body.companyId || body.companyMngId;
    if (!companyId) {
      throw new HttpErrors[400]('Missing companyId or companyMngId');
    }
    const deviceId = await this.authService.getDeviceIdFromRequest(request);
    const nextUser = await this.authService.switchCompany(currentUser, companyId, deviceId);

    const token = await this.v2AccessTokenService.generateTokenForCurrentUser(nextUser, deviceId);
    const refreshToken = await this.refreshTokenService.generateTokenForCurrentUser(nextUser);

    this.cookieService.sendCookies(response, refreshToken, deviceId);

    return new AuthV1LoginResponse({
      token,
      refreshToken,
    });
  }
}
