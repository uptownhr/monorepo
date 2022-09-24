//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import corsConfig from '@bambeehr/cors-config';
import GQLHttpExceptionFilter from '@bambeehr/gql-http-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import tracer from 'dd-trace';
import helmet from 'helmet';
import type * as winston from 'winston';
import { AppModule } from './app.module';
import { getLogger } from './lib/logging';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

export async function getApp(logger: winston.Logger = getLogger()) {
  const app = await NestFactory.create(AppModule, {
    /**
     * We need to ensure that Nest's internal INFO/LOG/ERROR go to the NodeJS console instead of stdout/stderr,
     * otherwise we won't see important messages when debugging.
     */
    logger: {
      error: (m) => logger.error(m),
      log: (m) => logger.info(m),
      warn: (m) => logger.warn(m),
      debug: (m) => logger.debug(m),
      verbose: (m) => logger.verbose(m),
    },
  });
  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  app.use(cookieParser(process.env.COOKIE_SECRET)); // used for serving files
  // Protect against some well known vulnerabilities: https://docs.nestjs.com/security/helmet
  // disable CSP for playground
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.useGlobalFilters(new GQLHttpExceptionFilter(logger));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  /**
   * NestJS redefines CorsOptions from in @nestjs/common/interfaces/external for some unknown reason, which is strange
   * given that the implementation is the exact same `cors` middleware we've all been using forever.  So we cast away
   * the type because cors.CorsOptions !== nestjs.CorsOptions
   *
   * https://github.com/nestjs/nest/blob/f69d157013d48e2ed4e74fbea51f5a749e300ea1/packages/platform-express/adapters/express-adapter.ts#L139
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.enableCors(corsConfig as any);

  if (configService.get('swagger.enabled')) {
    const config = new DocumentBuilder()
      .setTitle('Core V1 Service API')
      .setDescription('api for core-v1-service')
      .setVersion(process.env.npm_package_version as string)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  return app;
}
async function bootstrap() {
  tracer.init({
    logInjection: true,
    runtimeMetrics: true,
  });
  const app = await getApp();

  await app.listen(process.env.PORT ?? 80);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

async function main() {
  await bootstrap();
}

if (require.main === module) {
  main()
    .catch((e) => {
      getLogger().error(e);
    })
    .finally(() => {
      // noop
    });
}
