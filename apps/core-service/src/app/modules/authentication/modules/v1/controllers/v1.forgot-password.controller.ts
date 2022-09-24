//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { AuthV2Service } from '../services/auth-v2.service';
import { AuthV1CookieService } from '../services/cookie-v1.service';
import { AuthV1AccessTokenService } from '../services/v1.access-token.service';
import { AuthV1RefreshTokenService } from '../services/v1.refresh-token.service';
import { AuthV1ForgotPasswordBody } from './models/AuthV1ForgotPasswordBody';
import { AuthV1LoginResponse } from './models/AuthV1LoginResponse';

@Controller('/auth/v1')
@ApiTags('AuthV1')
export class V1ControllerForgotPasswordController {
  constructor(
    protected authService: AuthV2Service,
    protected cookieService: AuthV1CookieService,
    protected refreshTokenService: AuthV1RefreshTokenService,
    protected v2AccessTokenService: AuthV1AccessTokenService,
  ) {}

  @Post('/forgot-password')
  @ApiResponse({
    status: 200,
    type: AuthV1LoginResponse,
  })
  public async forgotPassword(@Req() request: Request, @Body() body: AuthV1ForgotPasswordBody) {
    try {
      await this.authService.forgotPassword(body.email);
    } catch (e) {
      // noop
    }
  }
}
