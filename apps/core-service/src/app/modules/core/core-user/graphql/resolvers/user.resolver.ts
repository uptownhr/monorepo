//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser, getCurrentUserFromNestRequest } from '@bambeehr/authentication-guard';
import { subject } from '@casl/ability';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import { serializeError } from 'serialize-error';
import * as winston from 'winston';
import type { DeepPartial } from '../../../../../types/DeepPartial';
import { CoreCompany, mapCoreCompanyDtoToModel } from '../../../core-company/graphql/models/company.model';
import { userDtoAbility } from '../../acl/core-user.acl';
import { UserService } from '../../services';
import { CoreUserEmployment, mapUserDtoToCoreUserEmployment } from '../models/user-employment.model';
import { CoreUserPermissions, mapUserDtoToCoreUserPermissions } from '../models/user-permissions.model';
import { CoreUserProfile, mapUserDtoToCoreUserProfile } from '../models/user-profile.model';
import { CoreUserSettings, mapUserDtoToCoreUserSettings } from '../models/user-settings.model';
import { CoreUserStates, mapUserDtoToCoreUserStates } from '../models/user-states.model';
import { CoreUser, mapUserDtoToCoreUser } from '../models/user.model';

@Resolver(() => CoreUser)
export class CoreUserResolver {
  constructor(protected userService: UserService, @Inject('LOGGER') private readonly logger: winston.Logger) {}

  @ResolveReference()
  async resolveReference(reference, ctx): Promise<DeepPartial<CoreUser> | null> {
    /**
     * Because we don't need to do any translation and the external/internal IDs are the same, we can simplly
     * inform apollo that core-user-service can implement this reference, and apollo will use the field resolvers as
     * normal.
     */

    try {
      const currentUser = await getCurrentUserFromNestRequest(ctx.req, undefined);
      const user = await this.userService.getAccessibleUser(currentUser, reference.id);
      if (!user) {
        return null;
      }
      return mapUserDtoToCoreUser(user);
    } catch (e) {
      this.logger.debug('getUserFromRequest error', { err: serializeError(e) });
      throw e;
    }
  }

  @Query(() => CoreUser)
  async getCoreUserById(
    @Args('id', { type: () => GraphQLID }) id: string,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<CoreUser> | null> {
    const user = await this.userService.getAccessibleUser(currentUser, id);
    if (!user) {
      return null;
    }
    // return user;
    return mapUserDtoToCoreUser(user);
  }

  @Query(() => CoreUser)
  async getMyCoreUser(@AuthUser() currentUser: CurrentUser) {
    const user = await this.userService.getAccessibleUser(currentUser, currentUser.userId);
    if (!user) {
      return null;
    }
    return mapUserDtoToCoreUser(user);
  }

  @ResolveField(() => CoreUserProfile, { nullable: true })
  async profile(@AuthUser() currentUser: CurrentUser, @Parent() user: CoreUser) {
    try {
      const accessibleUser = await this.userService.getAccessibleUser(currentUser, user.id, false, 'profile');
      if (!accessibleUser) {
        return null;
      }
      const res = mapUserDtoToCoreUserProfile(userDtoAbility(currentUser), accessibleUser);
      return res;
    } catch (error) {
      return error;
    }
  }

  @ResolveField(() => CoreUserEmployment, { nullable: true })
  async employment(@AuthUser() currentUser: CurrentUser, @Parent() user: CoreUser) {
    try {
      const accessibleUser = await this.userService.getAccessibleUser(currentUser, user.id, false, 'employment');
      if (!accessibleUser) {
        return null;
      }
      const res = mapUserDtoToCoreUserEmployment(userDtoAbility(currentUser), accessibleUser);
      return res;
    } catch (error) {
      return error;
    }
  }

  @ResolveField(() => CoreUserPermissions, { nullable: true })
  async permissions(@AuthUser() currentUser: CurrentUser, @Parent() user: CoreUser) {
    try {
      const accessibleUser = await this.userService.getAccessibleUser(currentUser, user.id, false, 'permissions');
      if (!accessibleUser) {
        return null;
      }
      return mapUserDtoToCoreUserPermissions(userDtoAbility(currentUser), accessibleUser);
    } catch (error) {
      return error;
    }
  }
  @ResolveField(() => CoreUserStates, { nullable: true })
  async states(@AuthUser() currentUser: CurrentUser, @Parent() user: CoreUser) {
    try {
      const accessibleUser = await this.userService.getAccessibleUser(currentUser, user.id, false, 'states');
      if (!accessibleUser) {
        return null;
      }
      userDtoAbility(currentUser).can('read', subject('CoreUserDTO', accessibleUser), 'states.*');
      return mapUserDtoToCoreUserStates(userDtoAbility(currentUser), accessibleUser);
    } catch (error) {
      return error;
    }
  }

  @ResolveField(() => CoreUserSettings, { nullable: true })
  async settings(@AuthUser() currentUser: CurrentUser, @Parent() user: CoreUser) {
    try {
      const accessibleUser = await this.userService.getAccessibleUser(currentUser, user.id, false, 'settings');
      if (!accessibleUser) {
        return null;
      }
      return mapUserDtoToCoreUserSettings(userDtoAbility(currentUser), accessibleUser);
    } catch (error) {
      return error;
    }
  }

  @ResolveField(() => CoreCompany)
  async company(@AuthUser() currentUser: CurrentUser, @Parent() user: CoreUser) {
    try {
      const accessibleUser = await this.userService.getAccessibleUser(currentUser, user.id, false, 'settings');
      if (!accessibleUser?._company) {
        return null;
      }
      return mapCoreCompanyDtoToModel(accessibleUser._company);
    } catch (error) {
      return error;
    }
  }
}
