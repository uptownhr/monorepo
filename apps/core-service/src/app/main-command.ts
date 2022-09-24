//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CommandFactory } from 'nest-commander';
import { CommandModule } from './command.module';
import { getLogger } from './lib/logging';

async function bootstrap() {
  console.log('test');
  try {
    await CommandFactory.run(CommandModule, ['debug', 'warn', 'error']);
  } catch (e) {
    console.error('error', e);
  }
}

bootstrap()
  .catch((e) => {
    getLogger().error(e);
  })
  .finally(() => {});
