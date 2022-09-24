//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { TokenType } from '@bambeehr/authentication';
import { BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import type { CompanyRoleDTO } from '../dto/CompanyRole.dto';
import { CompanyRoleService } from '../services/company-role.service';
import type { CompanyRoleV1Response } from './models/CompanyRoleV1Response';

@Controller('/internal/company-roles/v1/by-company/:companyId')
@UseGuards(BambeeAuthGuard(TokenType.Service))
export class InternalCompanyRoleV1Controller {
  constructor(private companyRoleService: CompanyRoleService) {}

  @Get()
  public async getAllCompanyRoles(@Param('companyId') companyId: string): Promise<Array<CompanyRoleV1Response>> {
    const res = await this.companyRoleService.getAllCompanyRolesForCompany(companyId);
    return res?.map(mapToResponse) ?? [];
  }
}

function mapToResponse(dto: CompanyRoleDTO): CompanyRoleV1Response {
  return {
    id: dto.id,
    companyId: dto.companyId,
    title: dto.title,
    deletedAt: dto.deletedAt ?? undefined,
  };
}
