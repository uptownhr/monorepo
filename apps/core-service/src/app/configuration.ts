//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export const mainConfigurationFactory = () => ({
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  db: {
    url: process.env.CORE_DATABASE_URL,
    readonlyUrl: process.env.CORE_DATABASE_URL_RO || process.env.CORE_DATABASE_URL,
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  primaryDomain: process.env.PRIMARY_DOMAIN ?? 'local.bambee.com',
  segment: {
    key: process.env.CORE_SEGMENT_KEY,
  },
});
