//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Command, CommandRunner } from 'nest-commander';
import { UserInternalService } from '../services/user-internal.service';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({
  name: 'new-user-auth',
  description: 'creates a new auth for given user',
  arguments: '<userId> <email>',
  argsDescription: { userId: 'provide target userId to create new auth for', email: 'new email address auth record' },
})
export class NewUserAuthCommand extends CommandRunner {
  constructor(private readonly userInternalService: UserInternalService) {
    super();
  }
  async run(inputs: string[], options: BasicCommandOptions): Promise<void> {
    console.log(inputs, options);

    await this.userInternalService.newUserAuth(inputs[0], inputs[1]);
  }
}
