//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface WorkerRoleDTO {
  readonly id: string;
  readonly companyRoleId: string;
  readonly userId: string;
  readonly payRate: number;
  readonly isPrimary: boolean;
  readonly deletedAt?: Date;
}
