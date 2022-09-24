//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import type { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseClient, Issuer } from 'openid-client';

async function gsuiteIssuerProviderFactory(configService: ConfigService): Promise<Issuer<BaseClient>> {
  const googleIssuer = await Issuer.discover('https://accounts.google.com');
  return googleIssuer;
}
export const GsuiteIssuerProvider: Provider<Promise<Issuer<BaseClient>>> = {
  provide: 'GSUITE_ISSUER',
  useFactory: gsuiteIssuerProviderFactory,
  inject: [ConfigService],
};

async function gsuiteClientFactory(
  configService: ConfigService,
  gsuiteIssuer: Issuer<BaseClient>,
): Promise<BaseClient> {
  if (process.env.__GENERATE_CLIENT === 'true') {
    return {
      authorizationUrl(parameters?) {
        return '';
      },
      async callback(redirectUri, parameters, checks?, extras?) {
        return {};
      },
      callbackParams(input) {
        return {};
      },
      oauthCallback(redirectUri, parameters, checks?, extras?) {
        return {};
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
  const client = new gsuiteIssuer.Client({
    client_id: configService.get<string>('authentication.openid.bambee-gsuite.clientId')!,
    client_secret: configService.get<string>('authentication.openid.bambee-gsuite.clientSecret')!,
    redirect_uris: configService.get<string[]>('authentication.openid.bambee-gsuite.redirectUris'),
    response_types: ['code'],
    // id_token_signed_response_alg (default "RS256")
    // token_endpoint_auth_method (default "client_secret_basic")
  }); // => Client

  return client;
}
export const GsuiteClientProvider: Provider<Promise<BaseClient>> = {
  provide: 'GSUITE_CLIENT',
  useFactory: gsuiteClientFactory,
  inject: [ConfigService, 'GSUITE_ISSUER'],
};
