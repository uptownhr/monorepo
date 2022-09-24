//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { RedisService } from '@liaoliaots/nestjs-redis';
import { HealthCheckError } from '@nestjs/terminus';
import Redis from 'ioredis';
import { RedisHealthIndicator } from './redis.indicator';

describe('RedisHealthIndicator', () => {
  it('fails with an unestablished connection', async () => {
    const badClient = new Redis('redis://localhost:12345', {
      lazyConnect: true,
    });
    const clientMap = new Map();
    clientMap.set('default', badClient);

    const service = new RedisService(clientMap);
    const indicator = new RedisHealthIndicator(service);
    await expect(indicator.isHealthy('default')).rejects.toThrowError(
      new HealthCheckError('RedisHealthIndicator failed', {
        default: {
          clientStatus: 'wait',
        },
      }),
    );
  });

  it('succeeds with a good connection', async () => {
    const goodClient = new Redis(process.env.REDIS_URL!, {
      lazyConnect: true,
    });
    await goodClient.connect();
    const clientMap = new Map();
    clientMap.set('default', goodClient);

    const service = new RedisService(clientMap);
    const indicator = new RedisHealthIndicator(service);
    await expect(indicator.isHealthy('default')).resolves.toMatchObject({
      default: {
        clientStatus: 'ready',
        status: 'up',
      },
    });
    goodClient.disconnect();
  });
});
