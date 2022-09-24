//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { V2CurrentUser } from '@bambeehr/authentication';
import { Inject, Injectable } from '@nestjs/common';
import { add } from 'date-fns';
import type { Request, Response } from 'express';
import * as HttpErrors from 'http-errors';
import { BaseClient, generators } from 'openid-client';
import { BASE_URL } from '../../v3/lib/base-url';
import { AuthV2Service } from './auth-v2.service';

export interface RedirectResponse {
  user: V2CurrentUser;
  redirectUrl: string;
  app: string;
}

@Injectable()
export class OpenIdV1Service {
  constructor(private authService: AuthV2Service, @Inject('GSUITE_CLIENT') private gsuiteClient: BaseClient) {}

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

  async handleRedirect(req: Request, res: Response, provider: string, deviceId: string): Promise<RedirectResponse> {
    const client = this.#getProviderClient(provider);
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(`${BASE_URL}/auth/v1/openid/${provider}/callback`, params, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      code_verifier: req.cookies.code_verifier,
      state: params.state,
    });

    // get userinfo
    const userData = await client.userinfo(tokenSet);

    // store userinfo
    const stateData = JSON.parse(Buffer.from(params.state!, 'base64').toString());

    const currentUser = await this.authService.oauthComplete(req, res, provider, tokenSet, userData, deviceId);
    return {
      user: currentUser,
      redirectUrl: stateData.redirectUrl,
      app: stateData.app,
    };
  }

  #getProviderClient(provider: string): BaseClient {
    switch (provider) {
      case 'bambee-gsuite':
        return this.gsuiteClient;
      default:
        throw new HttpErrors[404](`Provider ${provider} not configured`);
    }
  }
}
