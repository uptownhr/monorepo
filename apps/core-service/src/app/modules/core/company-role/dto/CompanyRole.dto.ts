//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface CompanyRoleDTO {
  readonly id: string;
  readonly title: string;
  readonly companyId: string;
  readonly deletedAt?: Date | null;
  readonly createdAt: Date;
}
