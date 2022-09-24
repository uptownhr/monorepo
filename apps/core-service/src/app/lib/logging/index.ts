//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import prettyPrint from '@bambeehr/pretty-json-formatter';
import { RealConsoleTransport } from '@bambeehr/real-console-transport';
import * as winston from 'winston';

let logger: winston.Logger;

export function getLogger(): winston.Logger {
  if (!logger) {
    const outputFormat =
      process.env.JSON || process.env.JSON_OUTPUT || process.env.APP_ENV !== 'local'
        ? winston.format.json()
        : prettyPrint();

    logger = winston.createLogger({
      level: process.env.LOG_LEVEL ?? 'info',
      // adds the NestJS levels to the default console levels
      // levels: { ...winston.config.npm.levels, log: winston.config.npm.levels.info },
      format: winston.format.combine(winston.format.errors({ stack: true }), outputFormat),
      transports: new RealConsoleTransport({
        handleExceptions: true,
        handleRejections: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
    });
  }

  return logger;
}
