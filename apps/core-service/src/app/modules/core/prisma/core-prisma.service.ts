//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { PrismaClient } from './generated/core-prisma.client';

export * from './generated/core-prisma.client';

@Injectable()
export class CorePrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(config: ConfigService, @Inject('LOGGER') protected logger: Logger) {
    const dbUrl = config.get<string>('db.url');

    super({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$on('info' as any, (q) => {
      this.logger.info(q);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$on('query' as any, (q) => {
      this.logger.debug(q);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$on('warn' as any, (q) => {
      this.logger.warn(q);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$on('error' as any, (q) => {
      this.logger.error(q);
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
