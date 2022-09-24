//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, TokenType } from '@bambeehr/authentication';
import { AuthUser, BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Body, Controller, Get, Headers, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Express from 'express';
import { isHttpError } from 'http-errors';
import statClient from '../../../../../lib/stats';
import { AuthV3Service } from '../services/auth-v3.service';
import { AuthV3LoginRequestBody } from './models/AuthV3LoginRequestBody';
import { AuthV3RefreshRequestBody } from './models/AuthV3RefreshRequestBody';
import { AuthV3SwitchCompanyBody } from './models/AuthV3SwitchCompanyBody';
import { AuthV3SwitchUserBody } from './models/AuthV3SwitchUserBody';
import type { AuthV3TokenBody } from './models/AuthV3TokenBody';
import type { NonceV3GenerateResponse } from './models/NonceV3GenerateResponse';

@Controller('/auth/v3')
@ApiTags('AuthV3')
export class V3AuthController {
  constructor(protected authService: AuthV3Service) {}

  @Post('/login')
  public async login(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response,
    @Body() body: AuthV3LoginRequestBody,
    @Headers('origin') origin?: string,
    @Headers('x-forwarded-for') forwardRemote?: string,
  ): Promise<AuthV3TokenBody | NonceV3GenerateResponse> {
    try {
      const res = await this.authService.login(
        request,
        response,
        body.email,
        body.password,
        origin,
        forwardRemote,
        body.mfa,
      );
      statClient.increment('login.email.success');
      return res;
    } catch (e) {
      if (isHttpError(e)) {
        statClient.increment('login.email.failure', { reason: e.message });
      }
      throw e;
    }
  }

  @Post('/refresh')
  public async postRefresh(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response,
    @Body() body: AuthV3RefreshRequestBody,
  ): Promise<AuthV3TokenBody> {
    try {
      const res = await this.authService.refresh(request, response, body);
      statClient.increment('refresh.success');
      return res;
    } catch (e) {
      if (isHttpError(e)) {
        statClient.increment('refresh.failure', { reason: e.message });
      }
      throw e;
    }
  }

  @Get('/refresh')
  public async refresh(@Req() request: Express.Request, @Res() response: Express.Response): Promise<AuthV3TokenBody> {
    try {
      const res = await this.authService.refresh(request, response);
      statClient.increment('refresh.success');
      return res;
    } catch (e) {
      if (isHttpError(e)) {
        statClient.increment('refresh.failure', { reason: e.message });
      }
      throw e;
    }
  }

  @Post('/switch/user')
  @UseGuards(BambeeAuthGuard(TokenType.JWTv3))
  public async switchUser(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response,
    @Body() body: AuthV3SwitchUserBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<AuthV3TokenBody> {
    return this.authService.switchUser(request, response, currentUser, body.userId);
  }

  @Post('/switch/company')
  @UseGuards(BambeeAuthGuard(TokenType.JWTv3))
  public async switchCompany(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response,
    @Body() body: AuthV3SwitchCompanyBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<AuthV3TokenBody> {
    return this.authService.switchCompany(request, response, currentUser, body.companyId);
  }
}
