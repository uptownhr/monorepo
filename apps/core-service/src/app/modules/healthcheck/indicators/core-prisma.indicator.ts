//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { CorePrismaService } from '../../core/prisma/core-prisma.service';

@Injectable()
export class CorePrismaHealthIndicator extends HealthIndicator {
  constructor(@Inject(ModuleRef) private ref: ModuleRef) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const prisma = await this.ref.resolve(CorePrismaService);
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (e) {
      if (e instanceof Error) {
        throw new HealthCheckError(e.message, this.getStatus(key, false));
      }

      throw new HealthCheckError('Error checking DB', this.getStatus(key, false));
    }

    return this.getStatus(key, true);
  }
}
