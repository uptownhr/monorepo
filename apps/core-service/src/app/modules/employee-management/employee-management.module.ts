//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { EmployeeManagementPrismaService } from './prisma/employee-management-prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
    }),
  ],
  providers: [EmployeeManagementPrismaService],
})
export class EmployeeManagementModule {}
