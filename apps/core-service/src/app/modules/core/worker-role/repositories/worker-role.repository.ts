//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import type { CoreUserDTO, CoreUserEmploymentDTO } from '../../core-user/dto';
import { CoreEmployeePayType, CoreUserEmploymentInput } from '../../core-user/graphql/models/user-employment.model';

import * as prisma from '../../prisma/core-prisma.service';
import type { WorkerRoleDTO } from '../dto/WorkerRole.dto';

import { CreateWorkerRoleInput, UpdateWorkerRoleInput, WorkerRolePaytype } from '../graphql/models/WorkerRole.model';
import { fromWorkerRolePaytypeValues, mapWorkerRoleResult } from '../graphql/resolvers/lib/mapResult';

@Injectable()
export class WorkerRoleRepository {
  constructor(private prismaService: prisma.CorePrismaService /*, private companyRoleLoader: CompanyRoleLoader*/) {}

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param userIds
   * @returns
   */
  public async getWorkerRoles(userIds: string[], showDeleted?: boolean): Promise<WorkerRoleDTO[]> {
    const where: prisma.Prisma.WorkerRoleFindManyArgs['where'] = { userId: { in: userIds } };
    if (!showDeleted) {
      where.deletedAt = null;
    }

    const resp = await this.prismaService.workerRole.findMany({
      where,
    });
    const workerRoles = resp.map(mapWorkerRole);

    if (workerRoles.length) {
      return mapWorkerRoleResult(workerRoles);
    }

    return [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyRoleIds
   * @param afterDate
   * @returns
   */
  public async getDeletedWorkerRolesByCompanyRolesAfterDate(
    companyRoleIds: string[],
    afterDate: Date,
  ): Promise<WorkerRoleDTO[]> {
    const where: prisma.Prisma.WorkerRoleFindManyArgs['where'] = {
      companyRoleId: { in: companyRoleIds },
      deletedAt: { gte: afterDate },
    };

    const resp = await this.prismaService.workerRole.findMany({
      where,
    });
    const workerRoles = resp.map(mapWorkerRole);

    if (workerRoles.length) {
      return mapWorkerRoleResult(workerRoles);
    }

    return [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyRoleIds
   * @returns
   */
  public async getWorkerRolesByCompanyRoleId(
    companyRoleIds: string[],
    showDeleted?: boolean,
  ): Promise<WorkerRoleDTO[]> {
    const workerRoles: WorkerRoleDTO[] = [];
    for (const companyRoleId of companyRoleIds) {
      const where: prisma.Prisma.WorkerRoleFindManyArgs['where'] = { companyRoleId };
      if (!showDeleted) {
        where.deletedAt = null;
      }
      const resp = await this.prismaService.workerRole.findMany({
        where,
      });
      const roleDtos = resp.map(mapWorkerRole);
      workerRoles.push(...roleDtos);
    }
    if (workerRoles.length) {
      return mapWorkerRoleResult(workerRoles);
    }
    return [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param newRole
   * @returns
   */
  public async createWorkerRole(newRole: CreateWorkerRoleInput): Promise<WorkerRoleDTO | null> {
    if (!newRole.companyRoleId) {
      throw new Error(`A Company role for worker role is required in this payload. User ID ${newRole.userId}`);
    }

    if (newRole.isPrimary) {
      await this.prismaService.workerRole.updateMany({
        data: { isPrimary: false },
        where: { userId: newRole.userId },
      });
    }
    const workerRole = await this.prismaService.workerRole.create({
      data: {
        companyRoleId: newRole.companyRoleId,
        isPrimary: newRole.isPrimary,
        payRate: newRole.payRate,
        payType: toPrismaType(newRole.payType),
        userId: newRole.userId,
      },
    });
    if (!workerRole) {
      return null;
    }
    return mapWorkerRoleResult([mapWorkerRole(workerRole)])[0];
  }
  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param updateRole
   * @returns
   */
  public async updateWorkerRole(user: CoreUserDTO, updateRole: UpdateWorkerRoleInput): Promise<WorkerRoleDTO | null> {
    if (updateRole.isPrimary) {
      await this.prismaService.workerRole.updateMany({
        data: { isPrimary: false },
        where: { userId: user.id },
      });
    }
    const workerRole = await this.prismaService.workerRole.update({
      data: { isPrimary: updateRole.isPrimary },
      where: { id: updateRole.workerRoleId },
    });
    if (!workerRole) {
      return null;
    }
    return mapWorkerRoleResult([mapWorkerRole(workerRole)])[0];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyId
   * @returns
   */
  public async deleteWorkerRole(roleId: string): Promise<WorkerRoleDTO | null> {
    const workerRole = await this.prismaService.workerRole.update({
      where: { id: roleId },
      data: { deletedAt: new Date() },
    });

    if (!workerRole) {
      return null;
    }
    return mapWorkerRoleResult([mapWorkerRole(workerRole)])[0];
  }
}

function mapWorkerRole(r: prisma.WorkerRole): WorkerRoleDTO {
  return {
    id: r.id,
    isPrimary: r.isPrimary,
    payRate: r.payRate.toNumber(),
    payType: fromPrismaType(r.payType),
    userId: r.userId,
    companyRoleId: r.companyRoleId,
    deletedAt: r.deletedAt ?? null,
    createdAt: r.createdAt,
  };
}

export function toCoreUserEmploymentInput(workerRole: WorkerRoleDTO): Partial<CoreUserEmploymentInput> {
  return {
    payRate: `${workerRole.payRate}`,
    payType: toCoreEmployeePayType(fromWorkerRolePaytypeValues(workerRole.payType)),
  };
}

export function toCoreEmployeePayType(t: WorkerRolePaytype): CoreEmployeePayType {
  switch (t) {
    case WorkerRolePaytype.Hourly:
      return CoreEmployeePayType.Hourly;
    case WorkerRolePaytype.Contractor:
      return CoreEmployeePayType.Contractor;
    case WorkerRolePaytype.Salary:
      return CoreEmployeePayType.Salary;
  }
}

export function fromCoreEmployeePayType(t: CoreEmployeePayType): WorkerRolePaytype {
  switch (t) {
    case CoreEmployeePayType.Hourly:
      return WorkerRolePaytype.Hourly;
    case CoreEmployeePayType.Contractor:
      return WorkerRolePaytype.Contractor;
    case CoreEmployeePayType.Salary:
      return WorkerRolePaytype.Salary;
  }
}
export function fromCoreEmployeePayTypeDTO(t: CoreUserEmploymentDTO['payType']): WorkerRolePaytype | undefined {
  switch (t) {
    case 'hourly':
      return WorkerRolePaytype.Hourly;
    case 'contractor':
      return WorkerRolePaytype.Contractor;
    case 'salary':
      return WorkerRolePaytype.Salary;
  }
}

function toPrismaType(t: WorkerRolePaytype) {
  switch (t) {
    case WorkerRolePaytype.Hourly:
      return prisma.WorkerRolePaytype.Hourly;
    case WorkerRolePaytype.Contractor:
      return prisma.WorkerRolePaytype.Contractor;
    case WorkerRolePaytype.Salary:
      return prisma.WorkerRolePaytype.Salary;
  }
}

function fromPrismaType(t: prisma.WorkerRolePaytype) {
  switch (t) {
    case prisma.WorkerRolePaytype.Hourly:
      return WorkerRolePaytype.Hourly;
    case prisma.WorkerRolePaytype.Contractor:
      return WorkerRolePaytype.Contractor;
    case prisma.WorkerRolePaytype.Salary:
      return WorkerRolePaytype.Salary;
  }
}
