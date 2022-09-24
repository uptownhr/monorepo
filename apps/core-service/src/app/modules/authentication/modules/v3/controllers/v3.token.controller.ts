//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, TokenType } from '@bambeehr/authentication';
import { AuthUser, BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SsoTokenService } from '../services/sso-token.service';
import type { AuthV3TokenBody } from './models/AuthV3TokenBody';
import { V3TokenConvertRequestBody } from './models/V3TokenConvertRequestBody';
import { V3TokenCreateRequestBody } from './models/V3TokenCreateRequestBody';
import type { V3TokenProfileResponse } from './models/V3TokenProfileResponse';
import { V3TokenRefreshRequestBody } from './models/V3TokenRefreshRequestBody';

@Controller('/auth/v3/token')
export class V3TokenController {
  constructor(protected ssoService: SsoTokenService) {}

  @Post('/create')
  @UseGuards(BambeeAuthGuard(TokenType.Internal, TokenType.JWTv3, TokenType.JWTv2))
  async createSsoToken(@Body() body: V3TokenCreateRequestBody, @AuthUser() me: CurrentUser) {
    return this.ssoService.generateCode(body.client_id, me.userId, me.authId);
  }

  @Post('/convert')
  async convertSsoToken(@Body() body: V3TokenConvertRequestBody): Promise<AuthV3TokenBody> {
    return this.ssoService.generateAccessToken(body.code, body.client_id, body.client_secret);
  }

  @Post('/refresh')
  async refreshSsoToken(@Body() body: V3TokenRefreshRequestBody): Promise<AuthV3TokenBody> {
    return this.ssoService.refreshAccessToken(
      body.access_token,
      body.refresh_token,
      body.client_id,
      body.client_secret,
    );
  }

  @Get('/profile')
  @UseGuards(BambeeAuthGuard(TokenType.SSOv1))
  async getSsoProfile(@AuthUser() me: CurrentUser): Promise<V3TokenProfileResponse> {
    return this.ssoService.getProfile(me.authId, me.userId);
  }
}
