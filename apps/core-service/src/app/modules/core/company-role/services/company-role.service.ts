//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import { CompanyRoleLoader } from '../dataloaders';
import { CompanyRoleLoaderById } from '../dataloaders/company-role-by-id.loader';
import type { CompanyRoleDTO } from '../dto/CompanyRole.dto';
import type { CreateRoleForCompanyInput, UpdateRoleForCompanyInput } from '../graphql/models/CompanyRole.model';
import { CompanyRoleRepository } from '../repositories';

@Injectable()
export class CompanyRoleService {
  constructor(
    @Inject(CompanyRoleLoader) private companyRoleLoader: CompanyRoleLoader,
    @Inject(CompanyRoleLoaderById) private companyRoleLoaderById: CompanyRoleLoaderById,
    @Inject(CompanyRoleRepository) private companyRoleRepo: CompanyRoleRepository,
  ) {}

  /**
   * Gets all company roles in a company
   * @param companyId
   * @returns
   */
  public async getAllCompanyRolesForCompany(companyId: string): Promise<CompanyRoleDTO[]> {
    return this.companyRoleLoader.load(companyId);
  }

  /**
   * Gets deleted company roles in a company
   * @param companyId
   * @param afterDate
   * @returns
   */
  public async getDeletedCompanyRolesForCompanyAfterDate(companyId: string, afterDate: Date) {
    return this.companyRoleRepo.getDeletedCompanyRolesAfterDate([companyId], afterDate);
  }

  /**
   * Get company role by id
   * @param companyRoleId
   * @returns
   */
  public async getCompanyRolesById(companyRoleId: string, showDeleted?: boolean) {
    return this.companyRoleRepo.getCompanyRolesById([companyRoleId], showDeleted);
  }

  /**
   * Create a role in a company.
   * If an active company role with the same title already exists, that role will be returned
   * @param newRole
   * @returns
   */
  public async createCompanyRole(newRole: CreateRoleForCompanyInput) {
    const existingRolesWithTitle = await this.companyRoleRepo.getCompanyRolesByTitle(
      [newRole.companyId],
      newRole.title,
    );
    if (existingRolesWithTitle?.length) {
      return existingRolesWithTitle[0];
    }
    return this.companyRoleRepo.createCompanyRole(newRole);
  }

  /**
   * Update a role in a company
   * @param updatedRole
   * @returns
   */
  public async updateCompanyRole(updatedRole: UpdateRoleForCompanyInput) {
    return this.companyRoleRepo.updateCompanyRole(updatedRole);
  }

  /**
   * Soft deletes a role in a company
   * @param roleId
   * @returns
   */
  public async deleteCompanyRole(roleId: string) {
    return this.companyRoleRepo.deleteCompanyRole(roleId);
  }
}
