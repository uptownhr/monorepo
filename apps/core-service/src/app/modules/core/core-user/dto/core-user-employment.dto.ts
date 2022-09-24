//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { WorkerRoleDTO } from './core-user-role.dto';

export interface CoreUserEmploymentDTO {
  readonly payType?: 'hourly' | 'salary' | 'contractor';
  readonly employeeType?: 'parttime' | 'fulltime' | 'contractor';
  readonly classification?: 'exempt' | 'non-exempt';
  readonly payRate?: string;
  readonly payDay?: string;
  readonly payFrequency?: string;
  readonly hoursPerWeek?: string;
  readonly startDate?: string;
  readonly stateWorksIn?: string;
  readonly isContractor: boolean;
  readonly contractorBusinessName?: string;
  readonly contractorType?: 'individual' | 'business';
  readonly title?: string;
  readonly supervisor: string;
  readonly managerId?: string;

  readonly _workerRoles?: WorkerRoleDTO[];
}
