//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { isUserBambae } from '../../../../../lib/is-user-bambae';
import { CoreCompany } from '../../../core-company/graphql/models/company.model';
import { CompanyUserGroupService } from '../../services';
import { CoreUserGroup } from '../models/CoreUserGroup.model';
import { mapResult } from './lib/mapResult';

@Resolver(() => CoreCompany)
export class CoreCompanyUserGroupResolver {
  constructor(protected userGroupService: CompanyUserGroupService) {}

  @ResolveField(() => [CoreUserGroup])
  async groups(@Parent() company: CoreCompany, @AuthUser() currentUser: CurrentUser): Promise<Array<CoreUserGroup>> {
    if (isUserBambae(currentUser) || currentUser.companyId === company.id) {
      const groups = await this.userGroupService.getAllGroupsForCompany(company.id);
      if (groups) {
        return mapResult(groups);
      }
    }

    return [];
  }
}
