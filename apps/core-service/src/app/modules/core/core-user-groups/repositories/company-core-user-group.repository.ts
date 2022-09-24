//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { CoreUserByIdLoader } from '../../core-user/dataloaders';
import * as prisma from '../../prisma/core-prisma.service';
import type { UserGroupDTO } from '../dto/UserGroup.dto';
import { UserGroupType } from '../types/UserGroupType';
import { CreateUserGroupRepository } from './create-user-group.repository';

@Injectable()
export class CompanyCoreUserGroupRepository {
  constructor(
    private createGroupRepo: CreateUserGroupRepository,
    private prismaService: prisma.CorePrismaService,
    private userByIdLoader: CoreUserByIdLoader,
  ) {}

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyId
   * @param groupType
   * @returns
   */
  public async getGroupsByType(companyId: string, groupType: UserGroupType) {
    const groups = await this.prismaService.coreUserGroup.findMany({
      where: { companyId, type: fromGroupType(groupType) },
      include: {
        members: true,
      },
    });
    if (groups.length) {
      return groups.map((g) => ({
        id: g.id,
        type: mapGroupType(g.type),
        name: g.name,
        members: g.members.map((m) => m.userId.trim()),
      }));
    }
    return [];
  }

  /**
   * TODO: re-write this using a single query instead of running it multiple times.
   *
   * Not going to overoptimize for MVP.
   * @param companyIds
   * @returns
   */
  public async getAllGroupsByCompanyIds(
    companyIds: readonly string[],
  ): Promise<Array<{ companyId: string; groups: UserGroupDTO[] }>> {
    return Promise.all(
      companyIds.map(async (id) => ({
        companyId: id,
        groups: await this.getAllGroups(id),
      })),
    );
  }

  public async getAllGroupsByOwnerIds(
    ownerIds: readonly string[],
  ): Promise<Array<{ ownerId: string; groups: UserGroupDTO[] }>> {
    return Promise.all(
      ownerIds.map(async (id) => ({
        ownerId: id,
        groups: await this.getOwnerGroups(id),
      })),
    );
  }

  public async getAllGroupsByUserIds(
    userIds: readonly string[],
  ): Promise<Array<{ userId: string; groups: UserGroupDTO[] }>> {
    return Promise.all(
      userIds.map(async (id) => ({
        userId: id,
        groups: await this.getUserGroups(id),
      })),
    );
  }

  public async getOwnerGroups(ownerId: string): Promise<UserGroupDTO[]> {
    const groups = await this.prismaService.coreUserGroup.findMany({
      where: { ownerId },
      include: {
        members: true,
      },
    });

    if (groups.length) {
      return groups.map(mapToDto);
    } else {
      return [];
    }
  }

  public async getUserGroups(userId: string): Promise<UserGroupDTO[]> {
    const groups = await this.prismaService.coreUserGroup.findMany({
      where: {
        OR: [
          {
            members: {
              some: { userId },
            },
          },
          {
            ownerId: userId,
          },
        ],
      },
      include: {
        members: true,
      },
    });

    if (groups.length) {
      return groups.map(mapToDto);
    } else {
      return [];
    }
  }

  public async getAllGroups(companyId: string): Promise<UserGroupDTO[]> {
    const groups = await this.prismaService.coreUserGroup.findMany({
      where: { companyId },
      include: {
        members: true,
      },
    });

    if (groups.length) {
      return groups.map(mapToDto);
    }
    return [];
  }

  async initializeAllGroups(companyId: string) {
    const groupCount = await this.prismaService.coreUserGroup.count({ where: { companyId } });

    // For the timebeing, ensure this only happens once.
    if (groupCount > 0) {
      return;
    }

    const all = await this.createGroupRepo.getAllGroups(companyId);
    for await (const group of all) {
      await this.#initializeGroup(companyId, group);
    }
  }

  async #initializeGroup(companyId: string, group: UserGroupDTO) {
    // do not create empty groups.
    if (group.members.length === 0) {
      return;
    }

    const createRes = await this.prismaService.coreUserGroup.create({
      data: {
        companyId,
        ownerId: group.ownerId?.length ? group.ownerId : null,
        type: fromGroupType(group.type),
        name: group.name,
      },
    });
    await this.prismaService.coreUserGroupMembership.createMany({
      data: group.members.map((m) => ({
        groupId: createRes.id,
        userId: m,
      })),
    });
  }

  async #initializeForUser(userId: string) {
    const doc = await this.userByIdLoader.load(userId);
    if (!doc?.companyId) {
      return;
    }

    const all = await this.createGroupRepo.getAllGroups(doc.companyId);

    const ownedGroups = all.filter((g) => g.ownerId?.trim() === userId);
    const memberOfGroups = all.filter((g) => g.members.map((m) => m.trim()).includes(userId));

    if (ownedGroups.length) {
      await this.#checkAndUpsertOwnedGroups(userId, ownedGroups);
    }
    if (memberOfGroups.length) {
      await this.#checkAndUpsertMemberGroups(userId, memberOfGroups);
    }
  }

  async #checkAndUpsertOwnedGroups(userId: string, groups: UserGroupDTO[]) {
    const userDoc = await this.userByIdLoader.load(userId);

    const uniqueTypes = groups.map((g) => g.type).filter((t) => t !== UserGroupType.Custom);
    const check = await this.prismaService.coreUserGroup.findMany({
      where: { AND: [{ ownerId: userId, type: { in: uniqueTypes.map((type) => fromGroupType(type)) } }] },
    });

    for await (const type of uniqueTypes) {
      if (check.find((c) => c.type === fromGroupType(type))) {
        // skip
      } else {
        const group = groups.find((g) => g.type === type);
        if (!group || !userDoc?.companyId) {
          // skip;
        } else {
          await this.#initializeGroup(userDoc.companyId, group);
        }
      }
    }
  }

  async #checkAndUpsertMemberGroups(userId: string, groups: UserGroupDTO[]) {
    const userDoc = await this.userByIdLoader.load(userId);
    if (!userDoc?.companyId) {
      return;
    }
    const uniqueTypes = groups.map((g) => g.type).filter((t) => t !== UserGroupType.Custom);

    // this should list all the groups the user SHOULD be in.
    // some may not have been created yet.
    const check = await this.prismaService.coreUserGroup.findMany({
      where: { AND: [{ companyId: userDoc.companyId, type: { in: uniqueTypes.map((type) => fromGroupType(type)) } }] },
      include: {
        members: true,
      },
    });

    for await (const type of uniqueTypes) {
      const existing = check.find((c) => c.type === fromGroupType(type));
      if (existing) {
        if (!existing.members.find((m) => m.userId.trim() === userId)) {
          // update the membership
          await this.prismaService.coreUserGroupMembership.create({
            data: {
              userId,
              groupId: existing.id,
            },
          });
        }
      } else {
        // crete the group
        const group = groups.find((g) => type === type);
        await this.#initializeGroup(userDoc.companyId, group!);
      }
    }
  }
}

function mapToDto(g): UserGroupDTO {
  return {
    id: g.id,
    type: mapGroupType(g.type),
    name: g.name.trim(),
    members: g.members.map((m) => m.userId.trim()),
  };
}
function mapGroupType(t: prisma.CoreUserGroupType): UserGroupType {
  switch (t) {
    case 'CUSTOM':
      return UserGroupType.Custom;
    case 'ADMINS':
      return UserGroupType.Admin;
    case 'CONTRACTORS':
      return UserGroupType.Contractors;
    case 'EMPLOYEES':
      return UserGroupType.Employees;
    case 'MANAGERS':
      return UserGroupType.Managers;
    case 'MANAGERS_WITH_REPORTS':
      return UserGroupType.ManagersWithReports;
    default:
      return UserGroupType.Custom;
  }
}

function fromGroupType(t: UserGroupType): prisma.CoreUserGroupType {
  switch (t) {
    case UserGroupType.Custom:
      return 'CUSTOM';
    case UserGroupType.Admin:
      return 'ADMINS';
    case UserGroupType.Contractors:
      return 'CONTRACTORS';
    case UserGroupType.Employees:
      return 'EMPLOYEES';
    case UserGroupType.Managers:
      return 'MANAGERS';
    case UserGroupType.ManagersWithReports:
      return 'MANAGERS_WITH_REPORTS';
    default:
      return 'CUSTOM';
  }
}
