//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { setupGeneration } from './lib/setup-generation';
import { getApp } from './main';

async function bootstrap() {
  process.env.__GENERATE_CLIENT = 'true';
  const containers = await setupGeneration();
  console.log('MONGO_URL', process.env.MONGO_URL);
  const app = await getApp();

  const config = new DocumentBuilder()
    .setTitle('Core V1 Service API')
    .setDescription('api for core-v1-service')
    .setVersion(process.env.npm_package_version as string)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const outFile = process.argv[2] ?? '';
  if (outFile) {
    fs.writeFileSync(outFile, JSON.stringify(document, null, 2), 'utf-8');
  } else {
    process.stdout.write(JSON.stringify(document, null, 2));
  }
  await app.close();

  await containers.mongoContainer.stop();
  await containers.pgContainer.stop();
  await containers.redisContainer.stop();
  await containers.network.stop();
}
bootstrap()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    process.exit(0);
  });
