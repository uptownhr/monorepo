//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { AwsUtil } from '@bambeehr/aws-i12e';
import { FactoryProvider, Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWS_UTIL_PROVIDER_KEY } from './keys';

export function awsFactory(configService: ConfigService): AwsUtil {
  /**
   * The AWS_ environment variables are only needed for local use or integration testing:
   * the running containers inherit credentials from their IAM role, and these need to be intentionally
   * left undefined.
   */
  const keyId = configService.get<string | undefined>('AWS_ACCESS_KEY_ID');
  const secretKey = configService.get<string | undefined>('AWS_SECRET_ACCESS_KEY');
  const awsRegion = configService.get<string | undefined>('AWS_REGION');
  const awsEndpoint = configService.get<string | undefined>('AWS_ENDPOINT');

  const util = new AwsUtil(keyId, secretKey, awsRegion, awsEndpoint);
  return util;
}

const AwsUtilProvider: FactoryProvider<AwsUtil> = {
  provide: AWS_UTIL_PROVIDER_KEY,
  useFactory: awsFactory,
  inject: [ConfigService],
  scope: Scope.DEFAULT,
};

@Module({
  providers: [AwsUtilProvider],
  exports: [AwsUtilProvider],
})
export class AwsModule {}
