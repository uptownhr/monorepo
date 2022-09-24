//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Args, Mutation, Parent, Query, registerEnumType, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';
import { isUserBambae } from '../../../../../lib/is-user-bambae';
import { CoreUser } from '../../../core-user/graphql/models/user.model';
import { UserService } from '../../../core-user/services';
import { CompanyUserGroupService } from '../../services';
import { CoreUserGroup } from '../models/CoreUserGroup.model';
import { mapResult } from './lib/mapResult';

enum GroupView {
  Default = 'Default',
  ThatIOwn = 'ThatIOwn',
  IAmMember = 'IAmMember',
  ICanSee = 'ICanSee',
}
registerEnumType(GroupView, {
  name: 'GroupView',
});

@Resolver(() => CoreUser)
export class CoreUserUserGroupResolver {
  constructor(protected userGroupService: CompanyUserGroupService, protected userService: UserService) {}

  @Query(() => [CoreUserGroup])
  async geyMyGroups(
    @Args('view', { type: () => GroupView, defaultValue: GroupView.Default }) view: GroupView,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<Array<CoreUserGroup>> {
    return [];
  }

  @ResolveField(() => [CoreUserGroup])
  async groups(@Parent() user: CoreUser, @AuthUser() currentUser: CurrentUser): Promise<Array<CoreUserGroup>> {
    if (isUserBambae(currentUser) || currentUser.userId === user.id) {
      const groups = await this.userGroupService.getAllGroupsForUser(user.id);
      if (groups) {
        return mapResult(groups);
      }
    }

    return [];
  }

  @Mutation(() => GraphQLBoolean)
  async forceInitializeUserGroups(@AuthUser() currentUser: CurrentUser) {
    if (currentUser.companyId) {
      await this.userGroupService.initializeCompanyGroups(currentUser.companyId);
      return true;
    } else {
      return false;
    }
  }
}
