//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
// Copyright Bambee 2019,2020. All Rights Reserved.

import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SystemOnlyGuard } from '../../../../consts';
import { CoreUserDTO } from '../../core-user/dto';
import { UserService } from '../../core-user/services';

@Controller('/internal/companies/v1')
@ApiTags('CompanyV1')
@SystemOnlyGuard()
export class InternalCompanyV1Controller {
  constructor(protected userService: UserService) {}

  @Get('/company/:company_id/employees')
  @ApiResponse({ status: 200, type: CoreUserDTO })
  async getEmployees(@Param('company_id') companyId: string): Promise<CoreUserDTO[]> {
    return this.userService.getAllCompanyUsers(companyId, true);
  }
}
