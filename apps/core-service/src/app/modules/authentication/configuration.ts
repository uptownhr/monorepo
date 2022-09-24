//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { registerAs } from '@nestjs/config';
import { plainToClass, Type } from 'class-transformer';
import { IsDefined, IsString, Matches, ValidateNested, validateSync } from 'class-validator';

const BASE_URL =
  process.env.APP_ENV === 'production'
    ? 'https://publicapi.bambee.com'
    : `https://publicapi.${process.env.APP_ENV}.bambee.com`;
class AuthenticationKey {
  @IsDefined()
  @IsString()
  publicKey: string;

  @IsDefined()
  @IsString()
  privateKey: string;

  @IsDefined()
  @IsString()
  @Matches(
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/,
  )
  expiresIn: string;
}

class V1AuthenticationKey {
  @IsDefined()
  @IsString()
  publicKey: string;

  @IsDefined()
  @IsString()
  privateKey: string;

  @IsDefined()
  @IsString()
  @Matches(
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/,
  )
  expiresIn: string;

  @IsDefined()
  @IsString()
  v1Secret: string;
}

class AuthenticationConfig {
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationKey)
  internal: AuthenticationKey;

  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationKey)
  jwt: V1AuthenticationKey;

  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationKey)
  refresh: V1AuthenticationKey;

  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationKey)
  masquerade: V1AuthenticationKey;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(AuthenticationConfig, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export const getConfiguration = () =>
  registerAs('authentication', () => {
    const config = {
      internal: {
        privateKey: process.env.INTERNAL_PRIVATE_KEY,
        publicKey: process.env.INTERNAL_PUBLIC_KEY,
        expiresIn: '20s',
      },
      jwt: {
        privateKey: process.env.JWT_PRIVATE_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
        expiresIn: process.env.TOKEN_EXPIRES_IN ?? '5m',
        v1Secret: process.env.TOKEN_SECRET ?? process.env.JWT_SECRET,
      },
      refresh: {
        privateKey: process.env.JWT_PRIVATE_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d',
        v1Secret: process.env.TOKEN_SECRET ?? process.env.JWT_SECRET,
      },
      masquerade: {
        privateKey: process.env.MASQ_PRIVATE_KEY,
        publicKey: process.env.MASQ_PUBLIC_KEY,
        expiresIn: process.env.TOKEN_EXPIRES_IN ?? '5m',
        v1Secret: process.env.MASQ_SECRET,
      },

      sso: {
        bambeeClub: {
          publicKey: process.env.SSO_BAMBEECLUB_PUBLIC_KEY,
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'simply-insured': {
          publicKey: process.env.SSO_SIMPLYINSURED_PUBLIC_KEY,
        },
      },

      openid: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'bambee-gsuite': {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          redirectUris: [`${BASE_URL}/auth/v3/openid/bambee-gsuite/callback`],
        },
        okta: {
          clientId: process.env.OKTA_CLIENT_ID,
        },
      },
    };
    if (process.env.__GENERATE_CLIENT === 'true') {
      return config;
    } else {
      return validate(config);
    }
  });
