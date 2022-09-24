//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from './generated/core-prisma.client';

export * from './generated/core-prisma.client';

@Injectable()
export class ReadonlyCorePrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(config: ConfigService) {
    const readonlyDbUrl = config.get<string>('db.readonlyUrl');

    super({
      datasources: {
        db: {
          url: readonlyDbUrl,
        },
      },
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
