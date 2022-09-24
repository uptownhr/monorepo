//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { CorePrismaService } from '../core/prisma/core-prisma.service';
import { EmployeeManagementPrismaService } from '../employee-management/prisma/employee-management-prisma.service';
import * as CoreAuthModule from './../core/core-auth';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';
import { CorePrismaHealthIndicator } from './indicators/core-prisma.indicator';
import { EmployeeManagementPrismaHealthIndicator } from './indicators/employment-prisma.indicator';
import { MongoHealthIndicator } from './indicators/mongo.indicator';
import { RedisHealthIndicator } from './indicators/redis.indicator';

@Module({
  controllers: [HealthcheckController],
  imports: [TerminusModule, MongooseModule.forFeature([...Object.values(CoreAuthModule.modelDefinitions)])],
  providers: [
    CorePrismaService,
    EmployeeManagementPrismaService,
    HealthcheckService,
    RedisHealthIndicator,
    MongoHealthIndicator,
    CorePrismaHealthIndicator,
    EmployeeManagementPrismaHealthIndicator,
  ],
})
export class HealthcheckModule {}
