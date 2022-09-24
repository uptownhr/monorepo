//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as HttpErrors from 'http-errors';
import { SystemOnlyGuard, UserAndSystemGuard } from '../../../../consts';
import { UsersV1RequestBody } from '../../models/UsersV1RequestBody.model';
import { UserEmploymentService, UserService } from '../services';
import { UpdateUserProfileV1Body, UserProfilesV1ResponseBody, UserProfileV1Body } from './models';
import { userDtoToProfileResponse } from './models/UserProfileV1Body.model';
import { UserV1ContractorType } from './models/UserV1ContractorType.model';

@Controller('/users/v1')
@ApiTags('UserProfileV1')
export class UserProfileV1Controller {
  constructor(private userService: UserService, private userEmploymentService: UserEmploymentService) {}

  @Get('/user/:user_id/profile')
  @ApiResponse({ status: 200, type: UserProfileV1Body })
  @UserAndSystemGuard()
  async getUserProfile(
    @Param('user_id') userId: string,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<Partial<UserProfileV1Body>> {
    const userDto = await this.userService.getAccessibleUser(currentUser, userId);
    if (!userDto) {
      throw new HttpErrors[404]();
    }
    return new UserProfileV1Body(userDtoToProfileResponse(userDto));
  }

  @Post('/user/by-id/profile')
  @ApiResponse({ status: 200, type: UserProfilesV1ResponseBody })
  @UserAndSystemGuard()
  async getUserProfiles(
    @Body() body: UsersV1RequestBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<UserProfilesV1ResponseBody> {
    const userDtos = await this.userService.getUsers(currentUser, body.userIds);
    return new UserProfilesV1ResponseBody({
      users: userDtos.map(userDtoToProfileResponse),
    });
  }

  @Post('/user/me/profile')
  @ApiResponse({ status: 200, type: UserProfileV1Body })
  @UserAndSystemGuard()
  async getMySelf(@AuthUser() currentUser: CurrentUser): Promise<UserProfileV1Body> {
    const userDto = await this.userService.getMyself(currentUser);
    if (!userDto) {
      throw new HttpErrors[404]();
    }
    return userDtoToProfileResponse(userDto);
  }

  /**
   * For now, only the service is allowed to update the user profile.
   */
  @Patch('/user/:user_id/profile')
  @ApiResponse({ status: 200, type: UserProfileV1Body })
  @SystemOnlyGuard()
  async updateuserProfile(
    @Param('user_id') userId: string,
    @Body() body: UpdateUserProfileV1Body,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<UserProfileV1Body> {
    let contractorType;
    if (body.contractorType) {
      contractorType =
        body.contractorType === UserV1ContractorType.Business
          ? 'business'
          : body.contractorType === UserV1ContractorType.Individual
          ? 'individual'
          : '';
    }
    await this.userEmploymentService.updateUserEmploymentFromInput(currentUser, userId, {
      contractorBusinessName: body.contractorBusinessName,
      contractorType,
    });
    const userDto = await this.userService.getAccessibleUser(currentUser, userId);
    if (!userDto) {
      throw new HttpErrors[404]();
    }
    return new UserProfileV1Body(userDtoToProfileResponse(userDto));
  }
}
