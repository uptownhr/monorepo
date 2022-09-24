//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { GroupsByOwnerIdLoader, GroupsByUserIdLoader } from '../dataloaders';
import { GroupsByCompanyIdLoader } from '../dataloaders/groups-by-company-id.loader';
import { CompanyCoreUserGroupRepository } from '../repositories';

@Injectable()
export class CompanyUserGroupService {
  constructor(
    private companyGroupLoader: GroupsByCompanyIdLoader,
    private ownerGroupLoader: GroupsByOwnerIdLoader,
    private userGroupLoader: GroupsByUserIdLoader,
    private userGroupRepo: CompanyCoreUserGroupRepository,
  ) {}

  /**
   * Gets all groups in a company
   * @param companyId
   * @returns
   */
  public async getAllGroupsForCompany(companyId: string) {
    const groups = await this.companyGroupLoader.load(companyId);
    return groups;
  }

  public async initializeCompanyGroups(companyId: string) {
    await this.userGroupRepo.initializeAllGroups(companyId);
  }

  /**
   * Gets all groups a user owns
   * @param ownerId
   * @returns
   */
  public async getAllGroupsForOwner(ownerId: string) {
    const groups = await this.ownerGroupLoader.load(ownerId);
    return groups;
  }

  /**
   * Gets all groups a user belongs to
   * @param userId
   * @returns
   */
  public async getAllGroupsForUser(userId: string) {
    const groups = await this.userGroupLoader.load(userId);
    return groups;
  }
}
