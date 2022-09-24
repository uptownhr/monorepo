//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { GenericContainer, Network } from 'testcontainers';

export async function setupGeneration() {
  const network = await new Network().start();
  const networkName = network.getName();

  const mongoContainer = await new GenericContainer('mongo:5.0')
    .withExposedPorts(27017)
    .withNetworkMode(networkName)
    .start();
  const mongoPort = mongoContainer.getMappedPort(27017).toString();
  const mongoHost = mongoContainer.getHost();
  const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/bambee-test`;
  process.env.MONGO_URL = mongoUrl;

  const pgContainer = await new GenericContainer('postgres:14.4-alpine')
    .withEnv('POSTGRES_USER', 'bambee-generation')
    .withEnv('POSTGRES_PASSWORD', 'asdfasdf')
    .withEnv('POSTGRES_DB', 'bambee-generation')
    .withEnv('PGUSER', 'bambee-generation')
    .withEnv('PGPASSWORD', 'asdfasdf')
    .withEnv('PGDATABASE', 'bambee-generation')
    .withExposedPorts(5432)
    .withNetworkMode(networkName)
    .start();

  const pgHost = pgContainer.getHost();
  const pgPort = pgContainer.getMappedPort(5432).toString();

  process.env.CORE_DATABASE_URL = `postgres://bambee-generation:asdfasdf@${pgHost}:${pgPort}/bambee-generation?schema=core`;
  process.env.EMPLOYEE_MANAGEMENT_DATABASE_URL = `postgres://bambee-generation:asdfasdf@${pgHost}:${pgPort}/bambee-generation?schema=employee`;

  const redisContainer = await new GenericContainer('redis:6.2.7-alpine')
    .withExposedPorts(6379)
    .withNetworkMode(networkName)
    .start();

  const redisPort = redisContainer.getMappedPort(6379).toString();
  const redisHost = redisContainer.getHost();
  const redisUrl = `redis://${redisHost}:${redisPort}`;

  process.env.REDIS_URL = redisUrl;

  return { network, pgContainer, mongoContainer, redisContainer };
}
