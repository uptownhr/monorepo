//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as CoreAuthModule from './core-auth';
import * as CoreCompanyModule from './core-company';
import * as CoreUserModule from './core-user';
import { NewUserAuthCommand } from './core-user/commands/new-user-auth.command';
import { UserInternalService } from './core-user/services/user-internal.service';
import { CoreUserRepository } from './core-user/repositories';
import { CoreAuthInternalRepository } from './core-auth/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      ...Object.values(CoreAuthModule.modelDefinitions),
      ...Object.values(CoreUserModule.modelDefinitions),
      ...Object.values(CoreCompanyModule.modelDefinitions),
    ]),
  ],
  providers: [UserInternalService, NewUserAuthCommand, CoreUserRepository, CoreAuthInternalRepository],
})
export class CoreV1ServiceCommandModule {}
