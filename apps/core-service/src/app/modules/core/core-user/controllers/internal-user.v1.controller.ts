//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SystemOnlyGuard } from '../../../../consts';
import { UsersV1RequestBody } from '../../models/UsersV1RequestBody.model';
import type { CoreUserDTO } from '../dto';
import { UserService } from '../services';
import { UsersV1ResponseBody, UserV1Body, UserV1EmploymentType } from './models';
import { userDtoToProfileResponse } from './models/UserProfileV1Body.model';

@Controller('/internal/users/v1')
@ApiTags('UserV1')
@SystemOnlyGuard()
export class InternalUserV1Controller {
  constructor(private userService: UserService) {}

  @Post('/user/by-id')
  @ApiResponse({ status: 200, type: UsersV1ResponseBody })
  async getUsers(@Body() body: UsersV1RequestBody): Promise<CoreUserDTO[]> {
    return this.userService.getUsersInternal(body.userIds);
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
