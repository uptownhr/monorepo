//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import * as HttpErrors from 'http-errors';
import { Logger } from 'winston';
import type { DeepPartial } from '../../../../../types/DeepPartial';
import { CompanyRoleService } from '../../../company-role/services';
import { AssignWorkerRolesInput, WorkerRole } from '../../../worker-role/graphql/models/WorkerRole.model';
import { mapWorkerRoleResult } from '../../../worker-role/graphql/resolvers/lib/mapResult';
import { toCoreUserEmploymentInput } from '../../../worker-role/repositories/worker-role.repository';
import { WorkerRoleService } from '../../../worker-role/services';
import { userDtoAbility } from '../../acl/core-user.acl';
import type { CoreUserDTO } from '../../dto';
import { UserEmploymentService, UserService } from '../../services';
import {
  CoreUserEmployment,
  CoreUserEmploymentInput,
  mapEmploymentInputToDto,
  mapUserDtoToCoreUserEmployment,
} from '../models/user-employment.model';
import { CoreUser, mapUserDtoToCoreUser } from '../models/user.model';

/**
 * TODO REFACTOR
 * This resolver does not own CoreUser, so @ResolveField(manager) and @ResolveField(directReports)
 * should only return { id: $userId },
 * and the CoreUser profile should do the rest.
 */
@Resolver(() => CoreUserEmployment)
export class CoreUserEmploymentRespover {
  constructor(
    protected userService: UserService,
    protected userEmploymentService: UserEmploymentService,
    @Inject('LOGGER') protected logger: Logger,
    @Inject(WorkerRoleService) protected workerRoleService: WorkerRoleService,
    @Inject(CompanyRoleService) protected companyRoleService: CompanyRoleService,
  ) {}

  @Mutation(() => CoreUser)
  async assignWorkerRoles(
    @Args('input') input: AssignWorkerRolesInput,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<CoreUser> | null> {
    const res = await this.userService.getAccessibleUser(currentUser, input.userId);
    if (!res) {
      throw new HttpErrors[404](`UserId ${input.userId} not found`);
    }

    // add worker roles
    if (input.add?.length) {
      for (const workerRole of input.add) {
        await this.workerRoleService.createWorkerRole(workerRole);
      }
    }

    // update worker roles
    if (input.update?.length) {
      for (const workerRole of input.update) {
        await this.workerRoleService.updateWorkerRole(res, workerRole);
      }
    }

    // soft delete worker roles
    if (input.delete?.length) {
      for (const roleId of input.delete) {
        await this.workerRoleService.deleteWorkerRole(roleId);
      }
    }

    // only update core is isprimary changed in either add or update
    if (input.add?.some((a) => a.isPrimary) || input.update?.some((a) => a.isPrimary)) {
      const userWorkerRoles = await this.workerRoleService.getAllWorkerRolesForUser(input.userId);
      const primaryRole = userWorkerRoles.find((r) => r.isPrimary);
      if (primaryRole) {
        try {
          await this.userEmploymentService.updateUserEmploymentFromInput(
            currentUser,
            input.userId,
            mapEmploymentInputToDto(toCoreUserEmploymentInput(primaryRole)),
          );
        } catch (error) {
          this.logger.error(`Failed to update core user employment`, {
            context: 'UserEmploymentResolver.assignWorkerRoles',
            primaryRole,
          });
        }
      }
    }
    const accessibleUser = await this.userService.getAccessibleUser(currentUser, input.userId);
    if (!accessibleUser) {
      throw new HttpErrors[404](`UserId ${input.userId} not found`);
    }

    return mapUserDtoToCoreUser(accessibleUser);
  }

  @ResolveField(() => CoreUser)
  async manager(
    @Parent() employment: CoreUserEmployment,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<CoreUser> | null> {
    let managerId = employment.manager?.id;
    if (!managerId) {
      const cu = await this.userService.getAccessibleUser(currentUser, employment.id);
      managerId = cu?.employment.managerId;
    }
    if (!managerId) {
      return null;
    }
    const user = await this.userService.getAccessibleUser(currentUser, managerId);
    if (!user) {
      throw new HttpErrors[404](`UserId ${managerId} not found`);
    }
    return mapUserDtoToCoreUser(user);
  }

  @ResolveField(() => [CoreUser])
  async directReports(
    @Parent() employment: CoreUserEmployment,
    @AuthUser() currentUser: CurrentUser,
  ): Promise<DeepPartial<CoreUser>[]> {
    const reports = await this.userService.getDirectReports(currentUser, employment.id);
    return reports.map(mapUserDtoToCoreUser) ?? [];
  }

  @Mutation(() => CoreUserEmployment)
  async updateCoreUserEmployment(
    @AuthUser() currentUser: CurrentUser,
    @Args('id', { type: () => GraphQLID }) id: string,
    @Args({ name: 'input', type: () => CoreUserEmploymentInput }) input: CoreUserEmploymentInput,
  ): Promise<Omit<CoreUserEmployment, 'directReports' | 'manager'>> {
    const res = await this.userEmploymentService.updateUserEmploymentFromInput(
      currentUser,
      id,
      mapEmploymentInputToDto(input),
    );
    if (!res) {
      throw new HttpErrors[404](`UserId ${id} not found`);
    }
    return mapUserDtoToCoreUserEmployment(userDtoAbility(currentUser), { id, employment: res } as CoreUserDTO);
  }

  @ResolveField(() => [WorkerRole])
  async workerRoles(
    @Parent() user: CoreUser,
    @AuthUser() currentUser: CurrentUser,
    @Args({ name: 'showDeleted', nullable: true }) showDeleted?: boolean,
  ): Promise<DeepPartial<WorkerRole>[]> {
    const workerRoles = await this.workerRoleService.getAllWorkerRolesForUser(user.id, showDeleted);
    if (workerRoles.length) {
      return mapWorkerRoleResult(workerRoles);
    }

    const userResp = await this.userService.getUser(currentUser, user.id);
    const employment = userResp?.employment;
    const companyId = userResp?.companyId;

    if (!employment || !companyId) {
      return [];
    }
    const newRoles = await this.workerRoleService.createWorkerRoleFromCoreUserEmployment(
      user.id,
      companyId,
      employment,
    );
    return mapWorkerRoleResult(newRoles);
  }
}
