//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { getBaseUrlFor } from '../lib/base-url';
import { OpenIdV3Service } from '../services/openid-v3.service';

@Controller('/auth/v3/openid/:provider')
export class V3OpenIdController {
  constructor(private openIdService: OpenIdV3Service) {}
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
    @Query('redirect_uri') redirectPath: string,
    @Query('app') app = 'app',
  ) {
    // disallow redirecting to login.
    if (redirectPath.match(/\/login/)) {
      redirectPath = '';
    }

    const state = Buffer.from(
      JSON.stringify({
        redirectUrl: (request.get('referer') ? request.get('referer') : getBaseUrlFor('honey')) + '/' + redirectPath,
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
    await this.openIdService.handleRedirect(req, res, provider);
  }
}
