//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import * as uuid from 'uuid';

export interface Dog {
  name: string;
  type: string;
}

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const redisClient = this.redisService.getClient();
    const clientStatus = redisClient.status;

    if (clientStatus !== 'ready') {
      const result = this.getStatus(key, false, {
        clientStatus,
      });
      throw new HealthCheckError('RedisHealthIndicator failed', result);
    }

    // can write ephemeral data to redis
    let isHealthy = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessError: any = undefined;

    const testKey = `health-check:${uuid.v4()}`;
    const testVal = `health-check:${uuid.v4()}`;
    try {
      await redisClient.set(testKey, testVal, 'EX', 1);
      const checker = await redisClient.get(testKey);
      if (checker === testVal) {
        isHealthy = true;
      } else {
        accessError = 'Identity Test failed';
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      accessError = error.message;
    }

    const result = this.getStatus(key, isHealthy, {
      clientStatus,
      accessError,
    });

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('RedisHealthIndicator failed', result);
  }
}
