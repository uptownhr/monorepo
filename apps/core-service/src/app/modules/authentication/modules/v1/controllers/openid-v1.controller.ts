//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiQuery } from '@nestjs/swagger';
import { addMilliseconds } from 'date-fns';
import type { Request, Response } from 'express';
import { getBaseUrlFor } from '../../v3/lib/base-url';
import { AuthV2Service } from '../services/auth-v2.service';
import { OpenIdV1Service } from '../services/openid-v1.service';
import { AuthV1AccessTokenService } from '../services/v1.access-token.service';
import { AuthV1RefreshTokenService } from '../services/v1.refresh-token.service';
import ms = require('ms');

@Controller('/auth/v1/openid/:provider')
export class V1OpenIdController {
  constructor(
    private configService: ConfigService,
    private openIdService: OpenIdV1Service,
    private authService: AuthV2Service,
    private refreshTokenService: AuthV1RefreshTokenService,
    private v2AccessTokenService: AuthV1AccessTokenService,
  ) {}

  @Get('/redirect')
  @ApiQuery({
    name: 'redirect_uri',
    required: false,
  })
  @ApiQuery({
    name: 'app',
    required: false,
  })
  async getRedirect(
    @Req() request: Request,
    @Res({ passthrough: false }) response: Response,
    @Param('provider') provider: string,
    @Query('redirect_uri') redirectPath?: string,
    @Query('app') app = 'app',
  ) {
    // disallow redirecting to login.
    if (redirectPath?.match(/\/login/)) {
      redirectPath = '';
    }

    const state = Buffer.from(
      JSON.stringify({
        redirectUrl:
          (request.get('referer') ? request.get('referer') : getBaseUrlFor('honey')) + '/' + redirectPath ?? '',
        app,
      }),
    ).toString('base64');

    const url = await this.openIdService.getAuthRedirectUrl(response, provider, state);
    response.redirect(302, url);
  }

  @Get('/callback')
  async handleCallback(
    @Req() req: Request,
    @Res({ passthrough: false }) res: Response,
    @Param('provider') provider: string,
  ) {
    const deviceId = await this.authService.getDeviceIdFromRequest(req);
    const { user, redirectUrl, app } = await this.openIdService.handleRedirect(req, res, provider, deviceId);
    const token = await this.v2AccessTokenService.generateTokenForCurrentUser(user, deviceId);
    const refreshToken = await this.refreshTokenService.generateTokenForCurrentUser(user);

    try {
      const now = new Date();
      const authCookieName = `${app}-${process.env.APP_ENV}-access-token`;
      const refreshCookieName = `${app}-${process.env.APP_ENV}-refresh-token`;
      const tokenExpiresIn = this.configService.get<string>('authentication.jwt.expiresIn');
      const refreshExpiresIn = this.configService.get<string>('authentication.refresh.expiresIn');
      res.cookie(authCookieName, token, {
        expires: addMilliseconds(now, ms(tokenExpiresIn!)),
        domain: '.bambee.com',
        path: '/',
        secure: true,
        sameSite: 'strict', // required until we can get cookies workinfgg in honey
      });
      res.cookie(refreshCookieName, refreshToken, {
        expires: addMilliseconds(now, ms(refreshExpiresIn!)),
        domain: '.bambee.com',
        path: '/',
        secure: true,
        sameSite: 'strict', // required until we can get cookies workinfgg in honey
      });
      res.status(200);
      res.send(
        `<!DOCTYPE html>
        <html>
          <head><meta http-equiv="refresh" content="0; url='${redirectUrl}'"></head>
          <body></body>
        </html>
      `.trim(),
      );
    } catch (e) {
      res.redirect(302, redirectUrl);
    }
    // return access token
  }
}
