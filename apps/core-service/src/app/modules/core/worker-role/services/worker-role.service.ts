//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import { compact } from 'lodash';
import type { CreateRoleForCompanyInput } from '../../company-role/graphql/models/CompanyRole.model';
import { CompanyRoleService } from '../../company-role/services';
import type { CoreUserDTO, CoreUserEmploymentDTO } from '../../core-user/dto';
import {
  WorkerRoleByCompanyRoleLoader,
  WorkerRoleByCompanyRoleShowDeletedLoader,
  WorkerRoleLoader,
  WorkerRoleShowDeletedLoader,
} from '../dataloaders';
import type { WorkerRoleDTO } from '../dto/WorkerRole.dto';
import type { CreateWorkerRoleInput, UpdateWorkerRoleInput } from '../graphql/models/WorkerRole.model';
import { WorkerRoleRepository } from '../repositories';
import { fromCoreEmployeePayTypeDTO } from '../repositories/worker-role.repository';

@Injectable()
export class WorkerRoleService {
  constructor(
    @Inject(WorkerRoleLoader) private workerRoleLoader: WorkerRoleLoader, // private companyRoleRepo: CompanyRoleRepository,
    @Inject(WorkerRoleByCompanyRoleLoader) private workerRoleByCompanyRoleLoader: WorkerRoleByCompanyRoleLoader, // private companyRoleRepo: CompanyRoleRepository,
    @Inject(WorkerRoleShowDeletedLoader) private workerRoleShowDeletedLoader: WorkerRoleShowDeletedLoader, // private companyRoleRepo: CompanyRoleRepository,
    @Inject(WorkerRoleByCompanyRoleShowDeletedLoader)
    private workerRoleByCompanyRoleShowDeletedLoader: WorkerRoleByCompanyRoleShowDeletedLoader, // private companyRoleRepo: CompanyRoleRepository,
    @Inject(WorkerRoleRepository) private workerRoleRepo: WorkerRoleRepository,
    @Inject(CompanyRoleService) private companyRoleService: CompanyRoleService,
  ) {}

  /**
   * Gets all worker roles for a user
   * @param userId
   * @returns
   */
  public async getAllWorkerRolesForUser(userId: string, showDeleted?: boolean): Promise<WorkerRoleDTO[]> {
    if (showDeleted) {
      return this.workerRoleShowDeletedLoader.load(userId);
    }
    const workerRoles = await this.workerRoleLoader.load(userId);
    return workerRoles;
  }

  /**
   * Creates worker + company role from core user
   * @param userId
   * @param companyId
   * @param employment
   * @returns
   */
  public async createWorkerRoleFromCoreUserEmployment(
    userId: string,
    companyId: string,
    employment: CoreUserEmploymentDTO,
  ): Promise<WorkerRoleDTO[]> {
    const payType = fromCoreEmployeePayTypeDTO(employment?.payType);

    if (!employment?.title) return [];
    if (!employment?.payRate) return [];
    if (!payType) return [];

    // if workerRoles don't exist, create a role from the core user employment input
    const companyRoleInput: CreateRoleForCompanyInput = {
      companyId: companyId,
      title: employment.title,
    };
    const workerRoleInput: CreateWorkerRoleInput = {
      userId: userId,
      isPrimary: true,
      payRate: parseFloat(employment.payRate),
      payType,
      newCompanyRole: companyRoleInput,
    };
    const newRole = await this.createWorkerRole(workerRoleInput);
    return compact([newRole]);
  }

  /**
   * Gets all worker roles for a multiple users
   * @param userIds
   * @returns
   */
  public async getAllWorkerRolesForUserIds(userIds: string[], showDeleted?: boolean): Promise<WorkerRoleDTO[]> {
    return this.workerRoleRepo.getWorkerRoles(userIds, showDeleted);
  }

  /**
   * Gets deleted worker roles for company after date
   * @param companyRoleIds
   * @param afterDate
   * @returns
   */
  public async getDeletedWorkerRolesByCompanyAfterDate(companyId: string, afterDate: Date): Promise<WorkerRoleDTO[]> {
    const activeCompanyRoles = await this.companyRoleService.getAllCompanyRolesForCompany(companyId);
    const deletedCompanyRolesAfterDate = await this.companyRoleService.getDeletedCompanyRolesForCompanyAfterDate(
      companyId,
      afterDate,
    );

    const companyRoleIds = [...activeCompanyRoles, ...deletedCompanyRolesAfterDate].map((cr) => cr.id);
    const activeWorkerRoles = await this.workerRoleRepo.getWorkerRolesByCompanyRoleId(companyRoleIds);
    const deletedWorkerRolesAfterDate = await this.workerRoleRepo.getDeletedWorkerRolesByCompanyRolesAfterDate(
      companyRoleIds,
      afterDate,
    );
    const workerRoles = [...activeWorkerRoles, ...deletedWorkerRolesAfterDate];

    const deletedWorkerRoles = workerRoles.filter((wr) => {
      const companyRoleIsDeleted = deletedCompanyRolesAfterDate.some((deleted) => wr.companyRoleId === deleted.id);
      return companyRoleIsDeleted || wr.deletedAt;
    });

    return deletedWorkerRoles;
  }

  /**
   * Gets all worker roles for a company role
   * @param companyRoleId
   * @returns
   */
  public async getAllWorkerRolesForCompanyRole(companyRoleId: string, showDeleted?: boolean) {
    if (showDeleted) {
      return this.workerRoleByCompanyRoleShowDeletedLoader.load(companyRoleId);
    }
    const workerRoles = await this.workerRoleByCompanyRoleLoader.load(companyRoleId);
    return workerRoles;
  }

  /**
   * Create a role in a company
   * @param newRole
   * @returns
   */
  public async createWorkerRole(newRole: CreateWorkerRoleInput) {
    let companyRoleId = newRole.companyRoleId;
    if (!newRole.companyRoleId) {
      const { newCompanyRole } = newRole;
      if (!newCompanyRole) {
        throw new Error(`Neither Company Role ID nor New Company Role found in payload. User ID ${newRole.userId}`);
      }
      const companyRole = await this.companyRoleService.createCompanyRole(newCompanyRole);
      companyRoleId = companyRole?.id;
    }

    return this.workerRoleRepo.createWorkerRole({ ...newRole, companyRoleId });
  }

  /**
   * Update a role in a company
   * @param updateRole
   * @returns
   */
  public async updateWorkerRole(user: CoreUserDTO, updateRole: UpdateWorkerRoleInput) {
    return this.workerRoleRepo.updateWorkerRole(user, updateRole);
  }

  /**
   * Soft deletes a role in a company
   * @param roleId
   * @returns
   */
  public async deleteWorkerRole(roleId: string) {
    return this.workerRoleRepo.deleteWorkerRole(roleId);
  }
}
