//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { add, addMilliseconds } from 'date-fns';
import type { Request, Response } from 'express';
import * as HttpErrors from 'http-errors';
import { BaseClient, generators } from 'openid-client';
import { BASE_URL } from '../lib/base-url';
import { AuthV3Service } from './auth-v3.service';
import ms = require('ms');

@Injectable()
export class OpenIdV3Service {
  constructor(
    private configService: ConfigService,
    @Inject('GSUITE_CLIENT') private gsuiteClient: BaseClient,
    private authService: AuthV3Service,
  ) {}

  async getAuthRedirectUrl(res: Response, provider: string, state: string) {
    const client = this.#getProviderClient(provider);

    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const authUrl = client.authorizationUrl({
      scope: 'openid email profile',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      offline_access: true,
      prompt: 'consent',
      resource: 'https://my.api.example.com/resource/32178',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      code_challenge: codeChallenge,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      code_challenge_method: 'S256',
      state,
    });
    res.cookie('code_verifier', codeVerifier, { httpOnly: true, expires: add(new Date(), { seconds: 60 }) });
    return authUrl;
  }

  async handleRedirect(req: Request, res: Response, provider: string) {
    const client = this.#getProviderClient(provider);
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(`${BASE_URL}/auth/v3/openid/${provider}/callback`, params, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      code_verifier: req.cookies.code_verifier,
      state: params.state,
    });

    // get userinfo
    const userData = await client.userinfo(tokenSet);

    // store userinfo
    const stateData = JSON.parse(Buffer.from(params.state!, 'base64').toString());
    const authCookieName = `${stateData.app}-${process.env.APP_ENV}-access-token`;
    const refreshCookieName = `${stateData.app}-${process.env.APP_ENV}-refresh-token`;
    try {
      const now = new Date();

      const tokenResponse = await this.authService.oauthComplete(req, res, provider, userData.email!);
      const tokenExpiresIn = this.configService.get<string>('authentication.jwt.expiresIn');
      const refreshExpiresIn = this.configService.get<string>('authentication.refresh.expiresIn');
      res.cookie(authCookieName, tokenResponse.accessToken, {
        expires: addMilliseconds(now, ms(tokenExpiresIn!)),
        domain: '.bambee.com',
        path: '/',
        secure: true,
        sameSite: 'strict', // required until we can get cookies workinfgg in honey
      });
      res.cookie(refreshCookieName, tokenResponse.refreshToken, {
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
          <head><meta http-equiv="refresh" content="0; url='${stateData.redirectUrl}'"></head>
          <body></body>
        </html>
      `.trim(),
      );
    } catch (e) {
      res.redirect(302, stateData.redirectUrl);
    }
    // return access token
  }

  #getProviderClient(provider: string): BaseClient {
    switch (provider) {
      case 'bambee-gsuite':
        return this.gsuiteClient;
      default:
        throw new HttpErrors[400](`Provider ${provider} not configured`);
    }
  }
}
