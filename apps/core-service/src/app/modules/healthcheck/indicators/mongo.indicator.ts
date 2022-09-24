//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Connection, Model, STATES } from 'mongoose';
import { Auth, AuthDocument } from '../../core/core-auth/schemas/core-auth.schema';

export interface Dog {
  name: string;
  type: string;
}

@Injectable()
export class MongoHealthIndicator extends HealthIndicator {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectConnection() private connection: Connection,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    let mongoStatus = STATES[0];
    try {
      const readyState = this.connection.readyState;
      mongoStatus = STATES[readyState];
    } catch (e) {
      // noop
    }
    if (mongoStatus !== 'connected') {
      const result = this.getStatus(key, false, {
        mongoStatus,
      });
      throw new HealthCheckError('RedisHealthIndicator failed', result);
    }

    // can write ephemeral data to redis
    let isHealthy = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessError: any = undefined;

    try {
      const result = await this.authModel.findOne();
      if (result) {
        isHealthy = true;
      } else {
        accessError = 'Unable to access CoreAuth db';
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      accessError = error.message;
    }

    const result = this.getStatus(key, isHealthy, {
      mongoStatus,
      accessError,
    });

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('MongoHealthIndicator failed', result);
  }
}
