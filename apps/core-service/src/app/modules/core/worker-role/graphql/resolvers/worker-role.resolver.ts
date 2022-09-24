//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import type { CompanyRoleDTO } from '../../../company-role/dto/CompanyRole.dto';
import { CompanyRole } from '../../../company-role/graphql/models/CompanyRole.model';
import { mapCompanyRoleResult } from '../../../company-role/graphql/resolvers/lib/mapResult';
import { CompanyRoleService } from '../../../company-role/services';
import { WorkerRole } from '../models/WorkerRole.model';

@Resolver(() => WorkerRole)
export class WorkerRoleResolver {
  constructor(@Inject(CompanyRoleService) protected companyRoleService: CompanyRoleService) {}

  @ResolveField(() => CompanyRole, { nullable: true })
  async companyRole(
    @AuthUser() currentUser: CurrentUser,
    @Parent() workerRole: WorkerRole,
  ): Promise<CompanyRoleDTO | null> {
    const companyRoles = await this.companyRoleService.getCompanyRolesById(workerRole.companyRoleId, true);
    if (companyRoles?.length) {
      return mapCompanyRoleResult(companyRoles)[0];
    }

    return null;
  }
}
