// const newrelicFormatter = require('@newrelic/winston-enricher')(winston);
import newrelicFormatter from '@newrelic/winston-enricher';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const newFormatter = newrelicFormatter(winston);

export interface GetTransportConfiguration {
  env?: string;
  logPath?: string;
  logLevel?: string;
  logFormat?: string;
}

export function getTransport({
                               logLevel,
                               logFormat,
                             }: GetTransportConfiguration): winston.transport {
  return new winston.transports.Console({
    level: logLevel || 'debug',
    handleExceptions: true,
    format: appModuleConsoleFormat(logFormat === 'json'),
  });
}

function appModuleConsoleFormat(JSON = false): winston.Logform.Format {
  console.log('JSON?', JSON);
  return JSON
    ? winston.format.combine(winston.format.json(), newFormatter())
    : winston.format.combine(
      winston.format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    );
}

export enum LOG_LEVELS {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}
