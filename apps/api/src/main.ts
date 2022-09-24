import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NewrelicInterceptor } from '@uptownhr/newrelic';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new NewrelicInterceptor());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
