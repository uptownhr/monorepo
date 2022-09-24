//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { HealthCheckService as Terminus } from '@nestjs/terminus';
import { Connection, STATES } from 'mongoose';
import { CorePrismaHealthIndicator } from './indicators/core-prisma.indicator';
import { EmployeeManagementPrismaHealthIndicator } from './indicators/employment-prisma.indicator';
import { MongoHealthIndicator } from './indicators/mongo.indicator';
import { RedisHealthIndicator } from './indicators/redis.indicator';

@Injectable()
export class HealthcheckService {
  constructor(
    @InjectConnection() private connection: Connection,
    private configService: ConfigService,
    @Inject(Terminus) private terminus: Terminus,
    @Inject(RedisHealthIndicator) private redisIndicator: RedisHealthIndicator,
    @Inject(MongoHealthIndicator) private mongoIndicator: MongoHealthIndicator,
    @Inject(CorePrismaHealthIndicator) private corePrismaIndicator: CorePrismaHealthIndicator,
    @Inject(EmployeeManagementPrismaHealthIndicator)
    private employeeManagementIndicator: EmployeeManagementPrismaHealthIndicator,
  ) {}
  async getHealthcheck(): Promise<{ ok: string }> {
    let mongoStatus = STATES[0];
    try {
      const readyState = this.connection.readyState;
      mongoStatus = STATES[readyState];
    } catch (e) {
      // noop
    }
    const ok = mongoStatus;
    // return status
    return { ok }; // This is to maintain the payload
  }

  async getInfo(): Promise<Record<string, string | boolean | undefined>> {
    const env = this.configService.get<string>('NODE_ENV');
    const redisUrl = this.configService.get<string>('aws.redisUrl');
    const sqsUrl = this.configService.get<string>('aws.sqsUrl');
    let mongoStatus = STATES[0];
    try {
      const readyState = this.connection.readyState;
      mongoStatus = STATES[readyState];
    } catch (e) {
      // noop
    }
    return {
      env,
      redisUrl,
      sqsUrl,
      mongoStatus,
    };
  }

  /**
   * Eventually, we'll want to configure things like memory/process limits
   * @returns
   */
  async getReady() {
    return this.terminus.check([
      () => this.redisIndicator.isHealthy('redis'),
      () => this.mongoIndicator.isHealthy('mongo'),
      () => this.corePrismaIndicator.isHealthy('core-prisma'),
      () => this.employeeManagementIndicator.isHealthy('employee-management-prisma'),
    ]);
  }

  async getHealthy() {
    return this.terminus.check([
      () => this.redisIndicator.isHealthy('redis'),
      () => this.mongoIndicator.isHealthy('mongo'),
      () => this.corePrismaIndicator.isHealthy('core-prisma'),
      () => this.employeeManagementIndicator.isHealthy('employee-management-prisma'),
    ]);
  }
}
