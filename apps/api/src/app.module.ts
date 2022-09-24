import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HackerNewsService } from './hnews/hacker-news.service';
import { HackerNewsFirstRepository } from './hnews/hacker-news-first.repository';
import { HackerNewsCronService } from './hnews/hacker-news.cron.service';
import { HackerNewsController } from './hnews/hacker-news.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactRepository } from './hnews/contact.repository';
import { ContactController } from './hnews/contact.controller';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { getTransport } from './logging';
import configuration from './configuration';
import {TestModule} from "./test/test.module";
import {PrismaModule} from "@uptownhr/prisma";

console.log(process.env.DATABASE_URL)
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      expandVariables: true,
    }),
    AuthModule.forRoot({
      secret: 'asdf',
    }),
    HealthModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transports: [
          getTransport({
            env: configService.get<string>('env.node'),
            logPath: configService.get<string>('log.path'),
            logLevel: configService.get<string>('log.level'),
            logFormat: configService.get<string>('log.format'),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    TestModule
  ],
  providers: [
    HackerNewsService,
    HackerNewsFirstRepository,
    ContactRepository,
    HackerNewsCronService,
  ],
  controllers: [HackerNewsController, ContactController],
})
export class AppModule {}
