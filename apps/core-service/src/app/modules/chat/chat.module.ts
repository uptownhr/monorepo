//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreV1ServiceModule } from '../core/core-v1-service.module';
import { getConfiguration } from './configuration';

import * as resolvers from './graphql/resolvers';
import * as providers from './providers';
import * as repositories from './repositories';
import * as services from './services';

@Module({
  providers: [
    ...Object.values(resolvers),
    ...Object.values(services),
    ...Object.values(repositories),
    ...Object.values(providers),
  ],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [getConfiguration()],
    }),
    CoreV1ServiceModule,
  ], // necessary for NestJS reasons
})
export class ChatModule {}
