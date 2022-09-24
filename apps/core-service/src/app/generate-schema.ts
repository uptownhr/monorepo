//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { printSubgraphSchema } from '@apollo/subgraph';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import * as fs from 'fs';
import { setupGeneration } from './lib/setup-generation';
import { getApp } from './main';

async function generateSchema() {
  process.env.__GENERATE_CLIENT = 'true';
  const containers = await setupGeneration();
  const app = await getApp();
  await app.init();

  const { schema } = app.get(GraphQLSchemaHost);
  const outputData = printSubgraphSchema(schema);

  const outFile = process.argv[2] ?? '';

  const defs = ``;
  if (outFile) {
    // fixes https://github.com/apollographql/federation/pull/1539
    fs.writeFileSync(outFile, defs + outputData.replace(/extend type Core/g, 'type Core'), 'utf-8');
  } else {
    process.stdout.write(outputData);
  }
  await app.close();
  await containers.mongoContainer.stop();
  await containers.pgContainer.stop();
  await containers.redisContainer.stop();
  await containers.network.stop();
}

generateSchema()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    process.exit(0);
  });
