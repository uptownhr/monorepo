//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import * as HttpErrors from 'http-errors';
import * as uuid from 'uuid';
import * as winston from 'winston';
import { NonceV3GenerateResponse } from '../controllers/models/NonceV3GenerateResponse';
import { NonceV3GetResponse } from '../controllers/models/NonceV3GetResponse';
import ms = require('ms');

export interface NonceV3Data {
  authId: string;
  userId: string;
}

const NONCE_PREFIX = 'auth-service:nonce';

export interface GenerateNonceOptions {
  expiration?: string;
  prefix?: string;
  nonceId?: string;
}

@Injectable()
export class NonceV3Service {
  constructor(private readonly redisService: RedisService, @Inject('LOGGER') private readonly logger: winston.Logger) {}
  /* istanbul ignore next */
  public async generateUserNonce(
    userId: string,
    authId: string,
    options: GenerateNonceOptions = { expiration: '10m', prefix: '' },
  ): Promise<NonceV3GenerateResponse> {
    return this.generateNonce(JSON.stringify({ userId, authId }), options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async generateNonce(data: any, options: GenerateNonceOptions = { expiration: '10m', prefix: '' }) {
    const expiration = options.expiration || '10m';
    const valPrefix = options.prefix ? `${options.prefix}:` : '';
    if (isNaN(ms(expiration))) {
      throw new HttpErrors[412]('Expiration Format Invalid');
    }

    const nonceVal = options.nonceId ?? uuid.v4();
    const check = await this.redisService.getClient().get(`${NONCE_PREFIX}:${valPrefix}${nonceVal}`);
    /* istanbul ignore if */
    if (check) {
      // This is one of those "it should never happen" cases, but it isn't mathematically impossible.
      // Upon 412, the client should try again.
      this.logger.info('Nonce conflict', {
        nonceVal,
      });
      throw new HttpErrors[409]('Nonce Conflict');
    }

    await this.redisService.getClient().set(`${NONCE_PREFIX}:${valPrefix}${nonceVal}`, data, 'PX', ms(expiration));

    return new NonceV3GenerateResponse({
      nonce: nonceVal,
      expiration: new Date(Date.now() + ms(expiration)),
    });
  }

  public async verifyNonce<T>(nonceVal: string, prefix?: string): Promise<{ parsed: T; expirationSeconds: number }> {
    const valPrefix = prefix ? `${prefix}:` : '';
    try {
      if (!uuid.validate(nonceVal)) {
        this.logger.info('Nonce Invalid', {
          nonceVal,
        });
        throw new HttpErrors[412]('Nonce Invalid');
      }
    } catch (e) {
      this.logger.info('Nonce Invalid', {
        nonceVal,
        error: e,
      });
      throw new HttpErrors[412]('Nonce Invalid');
    }

    const redisResponse = await this.redisService.getClient().get(`${NONCE_PREFIX}:${valPrefix}${nonceVal}`);
    if (!redisResponse) {
      this.logger.info('Nonce Not Found', {
        nonceVal,
      });
      throw new HttpErrors[404]('Nonce Not Found');
    }
    const expirationSeconds = await this.redisService.getClient().ttl(`${NONCE_PREFIX}:${valPrefix}${nonceVal}`);
    const parsed = JSON.parse(redisResponse) as T;
    return { expirationSeconds, parsed };
  }

  public async verifyUserNonce(nonceVal: string, prefix?: string): Promise<NonceV3GetResponse> {
    const { expirationSeconds, parsed } = await this.verifyNonce<Omit<NonceV3GetResponse, 'expiration'>>(
      nonceVal,
      prefix,
    );

    return new NonceV3GetResponse({
      expiration: expirationSeconds ? new Date(Date.now() + expirationSeconds * 1000) : null,
      ...parsed,
    });
  }

  public async consumeNonce(nonceVal: string, prefix?: string): Promise<NonceV3GetResponse> {
    try {
      if (!uuid.validate(nonceVal)) {
        this.logger.info('Nonce Invalid', {
          nonceVal,
        });
        throw new HttpErrors[412]('Nonce Invalid');
      }
    } catch (e) {
      this.logger.info('Nonce Invalid', {
        nonceVal,
        error: e,
      });
      throw new HttpErrors[412]('Nonce Invalid');
    }
    const valPrefix = prefix ? `${prefix}:` : '';

    const redisResponse = await this.redisService.getClient().get(`${NONCE_PREFIX}:${valPrefix}${nonceVal}`);
    if (!redisResponse) {
      this.logger.info('Nonce Not Found', {
        nonceVal,
      });
      throw new HttpErrors[404]('Nonce Not Found');
    }

    await this.redisService.getClient().del(`${NONCE_PREFIX}:${valPrefix}${nonceVal}`);
    const parsed = JSON.parse(redisResponse);
    return new NonceV3GetResponse({
      ...parsed,
    });
  }
}
