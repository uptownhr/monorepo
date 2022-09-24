//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ConfigService } from '@nestjs/config';
import { mainConfigurationFactory } from '../../../configuration';
import { getLogger } from '../../../lib/logging';
import { CorePrismaService } from './core-prisma.service';

describe('core-prisma.service', () => {
  const configuration = mainConfigurationFactory();

  const configService = new ConfigService(configuration);

  const corePrisma = new CorePrismaService(configService, getLogger());

  it('can establish a connection to the db', async () => {
    await expect(corePrisma.coreUserGroup.findMany()).resolves.toBeTruthy();
  });
});
