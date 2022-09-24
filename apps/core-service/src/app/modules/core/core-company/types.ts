//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { UserRole } from '@bambeehr/consts';
import type { CompanyV1EmploymentType } from './models/CompanyV1EmploymentType';

export interface GetEmployeesOptions {
  employmentType?: CompanyV1EmploymentType;
  role?: UserRole; // overrides default of [UserRole.Employee, UserRole.User]
  active?: Boolean;
}
