//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { buildClient, RedisEventClient } from '@bambeehr/event-redis-client';
import {
  FactoryProvider,
  Inject,
  Injectable,
  Module,
  OnApplicationShutdown,
  OnModuleDestroy,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type * as IORedis from 'ioredis';
import { getLogger } from '../../lib/logging';
import { AwsModule } from '../aws/aws.module';
import { EventService } from './event.service';
import { ANALYTICS_KEY, EVENT_CLIENT_PROVIDER_KEY } from './keys';
import Analytics = require('analytics-node');

export function eventClientFactory(configService: ConfigService): RedisEventClient | undefined {
  const redisConnectionString = configService.get<string | undefined>('redis.url');
  if (!redisConnectionString) {
    return;
  }

  const redisUrl = new URL(redisConnectionString as string);
  const connection: IORedis.RedisOptions = {
    host: redisUrl.hostname,
    port: +redisUrl.port,
    // username: redisUrl.username, // we do not currently have ACLs set up, just a password.
    password: redisUrl.password,
  };
  if (redisUrl.protocol === 'rediss:') {
    if (process.env.REDIS_SSL === 'allow-unauthorized') {
      connection.tls = {
        rejectUnauthorized: false,
      };
    } else if (process.env.REDIS_SSL_CA && process.env.REDIS_SSL_CERT && process.env.REDIS_SSL_CERT) {
      connection.tls = {
        ca: process.env.REDIS_SSL_CA,
        cert: process.env.REDIS_SSL_CERT,
        key: process.env.REDIS_SSL_KEY,
      };
    }
  }

  const client = buildClient({
    logger: getLogger(),
    squashErrors: process.env.NODE_ENV !== 'test',
    testMode: process.env.NODE_ENV === 'test',
    queueOptions: { redis: connection },
  });

  return client;
}

export const EventClientProvider: FactoryProvider<RedisEventClient | undefined> = {
  provide: EVENT_CLIENT_PROVIDER_KEY,
  useFactory: eventClientFactory,
  inject: [ConfigService],
  scope: Scope.DEFAULT,
};

@Injectable()
class RedisClienLifecycleHandler implements OnModuleDestroy, OnApplicationShutdown {
  constructor(@Inject(EVENT_CLIENT_PROVIDER_KEY) protected eventClient?: RedisEventClient) {}
  async onApplicationShutdown(signal?: string) {
    try {
      if (this.eventClient) {
        await this.eventClient.close();
      }
    } catch (error) {
      //noop
    }
  }
  async onModuleDestroy() {
    try {
      if (this.eventClient) {
        await this.eventClient.close();
      }
    } catch (error) {
      // noop
    }
  }
}

export const AnalyticsProvider = {
  provide: ANALYTICS_KEY,
  useFactory: (configService: ConfigService) => {
    const segmentKey = configService.get<string | undefined>('segment.key');
    if (process.env.NODE_ENV === 'test' || !segmentKey) {
      return {
        alias: () => {},
        flush: () => {},
        group: () => {},
        identify: () => {},
        page: () => {},
        screen: () => {},
        track: () => {},
      };
    }
    const a = new Analytics(segmentKey!);
    return a;
  },
  inject: [ConfigService],
};

@Module({
  providers: [AnalyticsProvider, EventClientProvider, RedisClienLifecycleHandler, EventService],
  exports: [AnalyticsProvider, EventClientProvider, EventService],
  imports: [AwsModule],
})
export class EventClientModule {}
