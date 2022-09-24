//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Global, HttpException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphqlInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { RewriteFrames } from '@sentry/integrations';
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { isHttpError } from 'http-errors';
import { mainConfigurationFactory } from './configuration';
import { getLogger } from './lib/logging';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AwsModule } from './modules/aws/aws.module';
import { ChatModule } from './modules/chat/chat.module';
import { CoreV1ServiceModule } from './modules/core/core-v1-service.module';
import { orphanedTypes } from './modules/core/graphql-orphaned-types.list';
import { EmployeeManagementModule } from './modules/employee-management/employee-management.module';
import { EventClientModule } from './modules/event-client/event-client.module';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';

const isDev = !['production', 'test'].includes(process.env.NODE_ENV ?? 'development');

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
    AwsModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [mainConfigurationFactory],
    }),
    EventClientModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: {
          version: 2,
        },
      },
      sortSchema: true,
      playground: false,
      plugins: [
        ApolloServerPluginInlineTrace, // necessary for orchestrating errors in apollo-gateway
        process.env.APP_ENV !== 'production' && process.env.APP_ENV !== 'test'
          ? ApolloServerPluginLandingPageGraphQLPlayground
          : ApolloServerPluginLandingPageDisabled,
      ],
      introspection: process.env.ALLOW_GQL_INTROSPECTION === 'true',
      buildSchemaOptions: {
        orphanedTypes,
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('mongo.url'),
        };
      },
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            url: configService.get('redis.url'),
          },
          closeClient: true,
        };
      },
    }),
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      debug: !!isDev,
      environment: process.env.APP_ENV,
      release: process.env.SENTRY_RELEASE ?? 'undefined',
      integrations: [
        new RewriteFrames({
          // https://stackoverflow.com/questions/63615262/sentry-not-getting-typescript-source-maps-when-integrated-with-nestjs
          root: process.cwd(),
        }),
      ],
      beforeSend: (event, hint) => {
        const error = hint?.originalException;
        if (error instanceof HttpException && error.getStatus() < 500) {
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (isHttpError(error) && error.status < 500) {
          return null;
        }

        return process.env.SENTRY_PREVENT_SEND !== 'true' ? event : null;
      },
      close: {
        enabled: true,
        // Time in milliseconds to forcefully quit the application
        timeout: 1,
      },
    }),
    CoreV1ServiceModule,
    AuthenticationModule,
    EmployeeManagementModule,
    HealthcheckModule,
    ChatModule,
    GlobalModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
})
export class AppModule {}
