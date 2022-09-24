//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserGroupType } from '../../../types/UserGroupType';
import { CoreUserGroupType } from '../../models/CoreUserGroup.model';

export function mapType(type: UserGroupType): CoreUserGroupType {
  switch (type) {
    case UserGroupType.Admin:
      return CoreUserGroupType.Admin;
    case UserGroupType.Contractors:
      return CoreUserGroupType.Contractors;
    case UserGroupType.Employees:
      return CoreUserGroupType.Employees;
    case UserGroupType.Managers:
      return CoreUserGroupType.Managers;
    case UserGroupType.ManagersWithReports:
      return CoreUserGroupType.ManagersWithReports;
    default:
      return CoreUserGroupType.Custom;
  }
}
