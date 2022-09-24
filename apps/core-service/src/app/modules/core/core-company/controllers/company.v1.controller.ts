//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
// Copyright Bambee 2019,2020. All Rights Reserved.

import { CurrentUser, isSystemUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { UserRole } from '@bambeehr/consts';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as HttpErrors from 'http-errors';
import { SystemOnlyGuard, UserAndSystemGuard } from '../../../../consts';
import { isUserBambae } from '../../../../lib/is-user-bambae';
import {
  CompanyV1EmployeeBody,
  CompanyV1EmploymentType,
  CompanyV1GetEmployeesRequestBody,
  CompanyV1GetEmployeesResponse,
  CompanyV1ProfileResponseBody,
} from '../models';
import { CompanyV1EmployeeRepository } from '../repositories/company-v1-employee.repository';
import { CompanyService } from '../services';

@Controller('/companies/v1')
@ApiTags('CompanyV1')
export class CompanyV1Controller {
  constructor(
    protected companyService: CompanyService,
    private readonly companyV1EmployeeRepo: CompanyV1EmployeeRepository,
  ) {}

  @Get('/company/:company_id/profile')
  @ApiResponse({ status: 200, type: CompanyV1ProfileResponseBody })
  @UserAndSystemGuard()
  async getCompanyProfile(
    @Param('company_id') companyId: string,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<CompanyV1ProfileResponseBody> {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    return this.companyService.getCompany(currentUser, companyId);
  }

  @Get('/company/:company_id/employees')
  @ApiResponse({ status: 200, type: CompanyV1GetEmployeesResponse })
  @ApiQuery({
    name: 'employmentType',
    enum: CompanyV1EmploymentType,
    required: false,
  })
  @ApiQuery({
    name: 'active',
    required: false,
  })
  @ApiQuery({
    name: 'role',
    required: false,
  })
  @UserAndSystemGuard()
  async getEmployees(
    @Param('company_id') companyId: string,
    @Query('employmentType') employmentType: CompanyV1EmploymentType = CompanyV1EmploymentType.W2,
    @AuthUser() currentUser: CurrentUser,
    @Query('active') active?: Boolean,
    @Query('role') role?: UserRole,
  ): Promise<CompanyV1GetEmployeesResponse> {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const employees = await this.companyV1EmployeeRepo.getCompanyEmployees(companyId, {
      employmentType,
      role,
      active,
    });

    return new CompanyV1GetEmployeesResponse({ employees });
  }

  @Post('/company/:company_id/employees/by-ids')
  @ApiResponse({ status: 200, type: CompanyV1GetEmployeesResponse })
  @SystemOnlyGuard()
  async getCompanyEmployeesByIDs(
    @Param('company_id') companyId: string,
    @Body() body: CompanyV1GetEmployeesRequestBody,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<CompanyV1GetEmployeesResponse> {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const employees = await this.companyV1EmployeeRepo.getCompanyEmployeesByUserIds(companyId, body.userIds);

    return new CompanyV1GetEmployeesResponse({ employees });
  }

  @Post('/employees/by-ids')
  @ApiResponse({ status: 200, type: CompanyV1GetEmployeesResponse })
  @SystemOnlyGuard()
  async getEmployeesByIDs(@Body() body: CompanyV1GetEmployeesRequestBody): Promise<CompanyV1GetEmployeesResponse> {
    const employees = await this.companyV1EmployeeRepo.getEmployeesByUserIds(body.userIds);

    return new CompanyV1GetEmployeesResponse({ employees });
  }

  @Get('/company/:company_id/employees/employee/:user_id')
  @ApiResponse({ status: 200, type: CompanyV1EmployeeBody })
  @UserAndSystemGuard()
  async getEmployee(
    @Param('company_id') companyId: string,
    @Param('user_id') userId: string,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<CompanyV1EmployeeBody> {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const employees = await this.companyV1EmployeeRepo.getCompanyEmployeesByUserIds(companyId, [userId]);

    return employees[0];
  }
}
