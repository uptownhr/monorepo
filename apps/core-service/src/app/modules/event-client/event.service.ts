//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, isSystemUser } from '@bambeehr/authentication';
import { AwsUtil, Company as CompanyInfra } from '@bambeehr/aws-i12e';
import { RedisEventClient } from '@bambeehr/event-redis-client';
import { Inject, Injectable } from '@nestjs/common';
import { AWS_UTIL_PROVIDER_KEY } from '../aws/keys';
import { EVENT_CLIENT_PROVIDER_KEY } from './keys';

@Injectable()
export class EventService {
  constructor(
    @Inject(AWS_UTIL_PROVIDER_KEY) protected awsUtil?: AwsUtil,
    @Inject(EVENT_CLIENT_PROVIDER_KEY) private eventClient?: RedisEventClient,
  ) {}
  public async userUpdateEvent(currentUser: CurrentUser, userId: string, updates) {
    const TopicArn = await this.awsUtil?.getSnsArnForDescriptor(CompanyInfra.CompanySns.EmployeeUpdated);

    await this.awsUtil?.sns
      .publish({
        TopicArn,
        Message: JSON.stringify({
          userId,
          updates,
        }),
      })
      .promise();

    await this.eventClient?.userFullIdentify({
      userId,
      timeStamp: Date.now(),
      byUserId: isSystemUser(currentUser) ? 'system' : currentUser.userId,
    });
  }

  public async userLogin(req) {
    await this.eventClient?.userLogin(req);
  }

  public async fullIdentify(userId: string) {
    await this.eventClient?.userFullIdentify({
      userId,
      timeStamp: Date.now(),
      byUserId: 'anonymous',
    });
  }
}
