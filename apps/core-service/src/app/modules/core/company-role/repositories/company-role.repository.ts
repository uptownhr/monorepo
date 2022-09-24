//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';

import * as prisma from '../../prisma/core-prisma.service';
import type { CompanyRoleDTO } from '../dto/CompanyRole.dto';
import type { CreateRoleForCompanyInput, UpdateRoleForCompanyInput } from '../graphql/models/CompanyRole.model';
import { mapCompanyRoleResult } from '../graphql/resolvers/lib/mapResult';

@Injectable()
export class CompanyRoleRepository {
  constructor(private prismaService: prisma.CorePrismaService /*, private companyRoleLoader: CompanyRoleLoader*/) {}

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyRoleIds
   * @returns
   */
  public async getCompanyRolesById(companyRoleIds: string[], showDeleted?: boolean): Promise<CompanyRoleDTO[]> {
    const where: prisma.Prisma.CompanyRoleFindManyArgs['where'] = { id: { in: companyRoleIds } };
    if (!showDeleted) {
      where.deletedAt = null;
    }
    const companyRoles = await this.prismaService.companyRole.findMany({
      where,
    });

    return companyRoles?.length ? mapCompanyRoleResult(companyRoles) : [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyIds
   * @returns
   */
  public async getCompanyRoles(companyIds: string[]): Promise<CompanyRoleDTO[]> {
    const companyRoles: CompanyRoleDTO[] = [];
    for (const companyId of companyIds) {
      const resp = await this.prismaService.companyRole.findMany({
        where: { companyId, deletedAt: null },
      });
      companyRoles.push(...resp);
    }
    if (companyRoles.length) {
      return mapCompanyRoleResult(companyRoles);
    }
    return [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyIds
   * @param title
   * @returns
   */
  public async getCompanyRolesByTitle(companyIds: string[], title: string): Promise<CompanyRoleDTO[]> {
    const companyRoles: CompanyRoleDTO[] = [];
    for (const companyId of companyIds) {
      const resp = await this.prismaService.companyRole.findMany({
        where: { companyId, deletedAt: null, title: title.trim() },
      });
      companyRoles.push(...resp);
    }
    if (companyRoles.length) {
      return mapCompanyRoleResult(companyRoles);
    }
    return [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyIds
   * @param afterDate
   * @returns
   */
  public async getDeletedCompanyRolesAfterDate(companyIds: string[], afterDate: Date): Promise<CompanyRoleDTO[]> {
    const companyRoles: CompanyRoleDTO[] = [];
    for (const companyId of companyIds) {
      const resp = await this.prismaService.companyRole.findMany({
        where: { companyId, deletedAt: { gte: afterDate } },
      });
      companyRoles.push(...resp);
    }
    if (companyRoles.length) {
      return mapCompanyRoleResult(companyRoles);
    }
    return [];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param newRole
   * @returns
   */
  public async createCompanyRole(newRole: CreateRoleForCompanyInput): Promise<CompanyRoleDTO | null> {
    const companyRole = await this.prismaService.companyRole.create({
      data: {
        companyId: newRole.companyId,
        title: newRole.title,
      },
    });
    if (!companyRole) {
      return null;
    }
    return mapCompanyRoleResult([companyRole])[0];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param updatedRole
   * @returns
   */
  public async updateCompanyRole(updatedRole: UpdateRoleForCompanyInput): Promise<CompanyRoleDTO | null> {
    const companyRole = await this.prismaService.companyRole.update({
      data: {
        title: updatedRole.title,
      },
      where: { id: updatedRole.id },
    });
    if (!companyRole) {
      return null;
    }
    return mapCompanyRoleResult([companyRole])[0];
  }

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param roleId
   * @returns
   */
  public async deleteCompanyRole(roleId: string): Promise<CompanyRoleDTO | null> {
    const companyRole = await this.prismaService.companyRole.update({
      where: { id: roleId },
      data: { deletedAt: new Date() },
    });

    if (!companyRole) {
      return null;
    }
    return mapCompanyRoleResult([companyRole])[0];
  }
}
