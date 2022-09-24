//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from './generated/employee-management-prisma.client';
import { ConfigService } from '@nestjs/config';

export * from './generated/employee-management-prisma.client';

@Injectable()
export class EmployeeManagementPrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(config: ConfigService) {
    const dbUrl = config.get<string>('employee-management.db.url');

    super({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
