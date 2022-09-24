import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from './prisma-client';
export * as DB from './prisma-client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
