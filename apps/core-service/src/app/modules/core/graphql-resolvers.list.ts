//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/**
 * List of all resolvers.  This is required for generating the federation schema.
 */

import * as CompanyRoleModule from './company-role';
import * as CoreCompanyModule from './core-company';
import * as CoreUserModule from './core-user';
import * as CoreUserGroupModule from './core-user-groups';
import * as WorkerRoleModule from './worker-role';

export const resolvers = [
  ...Object.values(CoreCompanyModule.resolvers),
  ...Object.values(CoreUserModule.resolvers),
  ...Object.values(CoreUserGroupModule.resolvers),
  ...Object.values(CompanyRoleModule.resolvers),
  ...Object.values(WorkerRoleModule.resolvers),
];
