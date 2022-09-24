//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { CoreUser } from '../../../core/core-user/graphql/models/user.model';
import { UserChatService } from '../../services';
import { CoreUserChatConfig } from '../models/CoreUserChatConfig.model';

@Resolver(() => CoreUser)
export class CoreUserChatConfigResolver {
  constructor(private userChatService: UserChatService) {}
  @ResolveField(() => CoreUserChatConfig)
  async chat(@AuthUser() currentUser: CurrentUser) {
    const config = await this.userChatService.getConfig(currentUser.userId);
    return {
      token: config?.accessToken,
    };
  }
}
