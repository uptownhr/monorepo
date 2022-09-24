//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as HttpErrors from 'http-errors';
import { UserAndSystemGuard } from '../../../../consts';
import { UsersV1RequestBody } from '../../models/UsersV1RequestBody.model';
import type { CoreUserDTO } from '../dto';
import { UserService } from '../services';
import { UsersV1ResponseBody, UserV1Body, UserV1EmploymentType } from './models';
import { userDtoToProfileResponse } from './models/UserProfileV1Body.model';
import { UserV1ConsumableToken } from './models/UserV1ConsumableToken.model';
import { UserV1Username } from './models/UserV1Username.model';

@Controller('/users/v1')
@ApiTags('UserV1')
export class UserV1Controller {
  constructor(private userService: UserService) {}

  @Get('/user/:user_id')
  @ApiResponse({ status: 200, type: UserV1Body })
  @UserAndSystemGuard()
  async getUserProfile(@Param('user_id') userId: string, @AuthUser() currentUser: CurrentUser): Promise<UserV1Body> {
    const userDto = await this.userService.getAccessibleUser(currentUser, userId);
    if (!userDto) {
      throw new HttpErrors[404]();
    }
    return userDtoToBody(userDto);
  }

  @Post('/user/by-id')
  @ApiResponse({ status: 200, type: UsersV1ResponseBody })
  @UserAndSystemGuard()
  async getUserProfiles(
    @Body() body: UsersV1RequestBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<UsersV1ResponseBody> {
    const userDtos = await this.userService.getUsers(currentUser, body.userIds);
    return new UsersV1ResponseBody({
      users: userDtos.map(userDtoToBody),
    });
  }

  @Post('/user/me')
  @ApiResponse({ status: 200, type: UserV1Body })
  @UserAndSystemGuard()
  async getMySelf(@AuthUser() currentUser: CurrentUser): Promise<UserV1Body> {
    const userDto = await this.userService.getMyself(currentUser);
    if (!userDto) {
      throw new HttpErrors[404]();
    }
    return userDtoToBody(userDto);
  }

  @Get('/user/:user_id/consumableToken')
  @ApiResponse({ status: 200, type: UserV1ConsumableToken })
  @UserAndSystemGuard()
  async getConsumableToken(
    @Param('user_id') userId: string,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<UserV1ConsumableToken> {
    return this.userService.getConsumableToken(currentUser, userId);
  }

  @Get('/user/consumableToken/:token/username')
  @ApiResponse({ status: 200, type: UserV1Username })
  @UserAndSystemGuard()
  async getUsernameFromConsumableToken(@Param('token') token: string): Promise<UserV1Username> {
    return this.userService.getUsernameFromConsumableToken(token);
  }
}

export function userDtoToBody(user: CoreUserDTO): UserV1Body {
  return {
    active: user.active,
    authId: '',
    employeeType: user.employment.employeeType ?? '',
    employmentType: user.employment.isContractor ? UserV1EmploymentType.Contractor : UserV1EmploymentType.W2,
    id: user.id,
    payAmount: user.employment.payRate ?? '',
    payType: user.employment.payType ?? '',
    startDate: user.employment.startDate ?? '',
    profile: userDtoToProfileResponse(user),
  };
}
