//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLID, GraphQLString } from 'graphql';
import { CoreAuthService } from '../../../core-auth/services';
import { UserProfileService, UserService } from '../../services';
import {
  CoreUserProfile,
  CoreUserProfileInput,
  mapUserProfileDTOToCoreUserProfile,
} from '../models/user-profile.model';

@Resolver(() => CoreUserProfile)
export class CoreUserProfileResolver {
  constructor(
    protected userService: UserService,
    protected authService: CoreAuthService,
    protected userProfileService: UserProfileService,
  ) {}

  @ResolveField(() => GraphQLString)
  async email(@Parent() profile: CoreUserProfile, @AuthUser() currentUser: CurrentUser) {
    try {
      const user = await this.userService.getAccessibleUser(currentUser, profile.id);

      if (!user) {
        return null;
      }

      return user.profile.email;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => CoreUserProfile)
  async updateCoreUserProfile(
    @AuthUser() currentUser: CurrentUser,
    @Args('id', { type: () => GraphQLID }) id: string,
    @Args({ name: 'input', type: () => CoreUserProfileInput }) input: CoreUserProfileInput,
  ): Promise<Omit<CoreUserProfile, 'email'> | null> {
    const profile = await this.userProfileService.updateUserProfileFromInput(currentUser, id, {
      address: input.address
        ? {
            city: input.address.city!,
            line1: input.address.line1!,
            line2: input.address.line2!,
            state: input.address.state!,
            zipCode: input.address.zipCode!,
          }
        : undefined,
      dob: input.dob,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      emergencyContact: input.emergencyContact
        ? {
            name: input.emergencyContact.name!,
            phone: input.emergencyContact.phone!,
            email: input.emergencyContact.email!,
            relationship: input.emergencyContact.relationship!,
          }
        : undefined,
    });
    return {
      id,
      ...mapUserProfileDTOToCoreUserProfile(profile),
    };
  }
}
