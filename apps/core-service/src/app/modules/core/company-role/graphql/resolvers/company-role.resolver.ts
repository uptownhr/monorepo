//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, isSystemUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as HttpErrors from 'http-errors';
import { isUserBambae } from '../../../../../lib/is-user-bambae';
import type { DeepPartial } from '../../../../../types';
import { WorkerRole } from '../../../worker-role/graphql/models/WorkerRole.model';
import { mapWorkerRoleResult } from '../../../worker-role/graphql/resolvers/lib/mapResult';
import { WorkerRoleService } from '../../../worker-role/services';
import type { CompanyRoleDTO } from '../../dto/CompanyRole.dto';
import { CompanyRoleService } from '../../services';

import {
  CompanyRole,
  CreateMultipleRolesForCompanyInput,
  DeleteCompanyRolesInput,
  UpdateMultipleRolesForCompanyInput,
} from '../models/CompanyRole.model';
import { mapCompanyRoleResult } from './lib/mapResult';

@Resolver(() => CompanyRole)
export class CompanyRoleResolver {
  constructor(
    protected companyRoleService: CompanyRoleService,
    @Inject(WorkerRoleService) protected workerRoleService: WorkerRoleService,
  ) {}

  @Mutation(() => [CompanyRole])
  async createCompanyRoles(
    @AuthUser() currentUser: CurrentUser,
    @Args('data') input: CreateMultipleRolesForCompanyInput,
  ) {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== input.companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const companyRoles: CompanyRoleDTO[] = [];
    for (const companyRoleTitle of input.titles) {
      const companyRole = await this.companyRoleService.createCompanyRole({
        companyId: input.companyId,
        title: companyRoleTitle,
      });
      if (!companyRole) {
        continue;
      }

      companyRoles.push(companyRole);
    }

    return mapCompanyRoleResult(companyRoles);
  }

  @Mutation(() => [CompanyRole])
  async updateCompanyRoles(
    @AuthUser() currentUser: CurrentUser,
    @Args('data') input: UpdateMultipleRolesForCompanyInput,
  ) {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== input.companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const companyRoles: CompanyRoleDTO[] = [];
    for (const companyRoleInput of input.roles) {
      const companyRole = await this.companyRoleService.updateCompanyRole(companyRoleInput);
      if (!companyRole) {
        continue;
      }

      companyRoles.push(companyRole);
    }

    return mapCompanyRoleResult(companyRoles);
  }

  @Mutation(() => [CompanyRole], { nullable: true })
  async deleteCompanyRolesById(@AuthUser() currentUser: CurrentUser, @Args('data') input: DeleteCompanyRolesInput) {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== input.companyId) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const companyRoles: CompanyRoleDTO[] = [];
    for (const roleId of input.roleIds) {
      const companyRole = await this.companyRoleService.deleteCompanyRole(roleId);
      if (!companyRole) {
        continue;
      }

      companyRoles.push(companyRole);
    }
    return mapCompanyRoleResult(companyRoles);
  }

  @ResolveField(() => [WorkerRole])
  async workerRoles(
    @Parent() companyRole: CompanyRole,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<WorkerRole>[]> {
    const workerRoles = await this.workerRoleService.getAllWorkerRolesForCompanyRole(companyRole.id);
    return mapWorkerRoleResult(workerRoles ?? []);
  }
}
