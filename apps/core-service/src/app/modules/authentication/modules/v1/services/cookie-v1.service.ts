//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { COOKIE_PREFIX } from '@bambeehr/authentication';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dateFns from 'date-fns';
import type { Response } from 'express';
import ms = require('ms');

@Injectable()
export class AuthV1CookieService {
  constructor(protected configService: ConfigService) {}
  /**
   * Creates cookies needed for device identification and refresh tokens.
   * Per spec, cookie names are case-insensitive.
   * @param refreshToken
   * @param deviceId
   */
  sendCookies(response: Response, refreshToken?: string, deviceId?: string) {
    const primaryDomain = this.configService.get('primaryDomain');
    const nodeEnv = process.env.NODE_ENV ?? 'development';
    const expiresIn = this.configService.get<string>('authentication.refresh.expiresIn');
    const expiration: number = ms(expiresIn!);

    const isStrict = process.env.BAMBEE_ENV?.includes('production') || process.env.APP_ENV?.includes('production');
    response.cookie(`${COOKIE_PREFIX}-refresh-token`, refreshToken, {
      secure: nodeEnv !== 'test',
      httpOnly: nodeEnv !== 'test',
      expires: dateFns.addMilliseconds(new Date(), expiration),
      signed: true,
      domain: nodeEnv !== 'test' ? '.' + primaryDomain : '127.0.0.1',
      path: '/',
      sameSite: isStrict ? 'strict' : 'none',
    });

    if (deviceId) {
      response.cookie(`${COOKIE_PREFIX}-device-id`, deviceId, {
        secure: nodeEnv !== 'test',
        expires: new Date(2147483647 * 1000), //forever
        httpOnly: nodeEnv !== 'test',
        signed: true,
        domain: nodeEnv !== 'test' ? '.bambee.com' : '127.0.0.1',
        path: '/',
        sameSite: isStrict ? 'strict' : 'none',
      });
    }
  }
}
