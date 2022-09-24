//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Global, Module } from '@nestjs/common';
import { CoreV1ServiceCommandModule } from './modules/core/core-v1-service-command.module';
import { getLogger } from './lib/logging';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mainConfigurationFactory } from './configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  providers: [
    {
      provide: 'LOGGER',
      useFactory: getLogger,
    },
  ],
  exports: ['LOGGER'],
})
class GlobalModule {}

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [mainConfigurationFactory],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('mongo.url'),
        };
      },
    }),

    CoreV1ServiceCommandModule,
  ],
})
export class CommandModule {}
