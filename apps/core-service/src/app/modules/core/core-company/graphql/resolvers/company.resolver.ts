//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, isSystemUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import * as HttpErrors from 'http-errors';
import { isUserBambae } from '../../../../../lib/is-user-bambae';
import type { DeepPartial } from '../../../../../types/DeepPartial';
import { CompanyRole } from '../../../company-role/graphql/models/CompanyRole.model';
import { mapCompanyRoleResult } from '../../../company-role/graphql/resolvers/lib/mapResult';
import { CompanyRoleService } from '../../../company-role/services';
import { CoreUser, mapUserDtoToCoreUser } from '../../../core-user/graphql/models/user.model';
import { CompanyV1EmploymentType } from '../../models';
import { CompanyUsersRepository } from '../../repositories/company-users.repository';
import { CompanyService } from '../../services';
import { FilterEmployeeArgs } from '../models/company-employee.args';
import { CoreCompany } from '../models/company.model';
@Resolver(() => CoreCompany)
export class CoreCompanyResolver {
  constructor(
    private companyService: CompanyService,
    @Inject(CompanyUsersRepository) private readonly coreUserRepository: CompanyUsersRepository,
    @Inject(CompanyRoleService) private readonly companyRoleService: CompanyRoleService,
  ) {}

  @ResolveReference()
  resolveReference(
    {
      id,
    }: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __typename: string;
      id: string;
    },
    @AuthUser() currentUser: CurrentUser,
  ) {
    return this.getCoreCompany(id, currentUser);
  }
  @Query(() => CoreCompany)
  async getCoreCompany(
    @Args('id', { type: () => GraphQLID }) id: string,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<CoreCompany> {
    if (!isUserBambae(currentUser) && currentUser.companyId !== id) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }
    const c = await this.companyService.getCompany(currentUser, id);
    return {
      id: c.id,
      name: c.name,
      address: c.address,
    };
  }
  @ResolveField(() => [CoreUser])
  async employees(
    @Parent() company: CoreCompany,
    @Args() args: FilterEmployeeArgs,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<CoreUser>[]> {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== company.id) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }
    const res = await this.coreUserRepository.getCompanyCoreUsers(company.id, {
      employmentType: args.employmentType ?? CompanyV1EmploymentType.All,
    });
    const response = res.map(mapUserDtoToCoreUser);
    return response;
  }

  @ResolveField(() => [CompanyRole])
  async companyRoles(
    @Parent() company: CoreCompany,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<CompanyRole>[]> {
    if (!isSystemUser(currentUser) && !isUserBambae(currentUser) && currentUser.companyId !== company.id) {
      throw new HttpErrors.Forbidden(`Permission denied to user: ${currentUser.userId}`);
    }

    const companyRoles = await this.companyRoleService.getAllCompanyRolesForCompany(company.id);
    if (!companyRoles) {
      return [];
    }
    return mapCompanyRoleResult(companyRoles);
  }
}
