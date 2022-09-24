//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../core-user/schemas/user.schema';
import type { UserGroupDTO } from '../dto/UserGroup.dto';
import { UserGroupType } from '../types/UserGroupType';

@Injectable()
export class CreateUserGroupRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Normally, we'd have specific queries, and not "select-all, retrieve, and filter"
   * @param companyId
   * @param groupType
   * @returns
   */
  public async getGroupsByType(companyId: string, groupType: UserGroupType) {
    const fullSet = await this.getAllGroups(companyId);
    return fullSet.filter((g) => g.type === groupType);
  }

  public async getByIds(companyIds: readonly string[]): Promise<Array<{ companyId: string; groups: UserGroupDTO[] }>> {
    const allUsers = await this.userModel.find({ _company: { $in: companyIds.map((id) => new ObjectId(id)) } });
    return companyIds.reduce((res, companyId) => {
      const companyUsers = allUsers.filter((u) => u._company?.equals(companyId));
      res.push({
        companyId,
        groups: this.#groupsForUsers(companyId, companyUsers),
      });
      return res;
    }, [] as Array<{ companyId: string; groups: UserGroupDTO[] }>);
  }

  public async getAllGroups(companyId: string): Promise<UserGroupDTO[]> {
    const users = await this.userModel.find({ _company: new ObjectId(companyId), active: true });
    return this.#groupsForUsers(companyId, users);
  }

  #groupsForUsers(companyId: string, users: UserDocument[]): UserGroupDTO[] {
    const result: UserGroupDTO[] = [];

    /**
     * All Employees
     */
    const employees = users.filter((u) => u.role === UserRole.Employee && u.profile.contractor === false);
    if (employees.length) {
      result.push({
        id: `company:${companyId}:${UserGroupType.Employees}`,
        name: 'All Employees',
        type: UserGroupType.Employees,
        members: employees.map((e) => e._id.toString()),
      });
    }

    /**
     * All Contractors
     */
    const contractors = users.filter((u) => u.role === UserRole.Employee && u.profile.contractor === true);
    if (contractors.length) {
      result.push({
        id: `company:${companyId}:${UserGroupType.Contractors}`,
        name: 'All Contractors',
        type: UserGroupType.Contractors,
        members: contractors.map((e) => e._id.toString()),
      });
    }

    /**
     * All Managers
     */
    const managers = users.filter((u) => u.role === UserRole.Employee && u.permissions.manager === true);
    if (managers.length) {
      result.push({
        id: `company:${companyId}:${UserGroupType.Managers}`,
        name: 'All Managers',
        type: UserGroupType.Managers,
        members: managers.map((e) => e._id.toString()),
      });
    }

    /**
     * All Admins
     */
    const admins = users.filter((u) => u.role === UserRole.User);

    if (admins.length) {
      result.push({
        id: `company:${companyId}:${UserGroupType.Admin}`,
        name: 'All Admins',
        type: UserGroupType.Admin,
        members: admins.map((e) => e._id.toString()),
      });
    }

    /**
     * All managers with their reports
     */
    return users.reduce((res, user) => {
      const reports = users.filter((u) => u._manager && user._id.equals(u._manager));
      if (reports.length) {
        res.push({
          id: `company:${companyId}:${UserGroupType.ManagersWithReports}:${user._id.toString()}`,
          ownerId: user._id.toString(),
          name: `${user.profile.first_name} ${user.profile.last_name}'s Team`,
          type: UserGroupType.ManagersWithReports,
          members: reports.map((e) => e._id.toString()).concat(user._id.toString()),
        });
      }
      return res;
    }, result);
  }
}
