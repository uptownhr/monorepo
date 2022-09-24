//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface CoreUserPermissionsDTO {
  readonly manager: boolean;
  readonly approver: boolean;
  readonly canCancelAccount: boolean;
  readonly canRetractSignedPolicies: boolean;
  readonly canEditGlobalPolicies: boolean;
  readonly canViewPayrollTab: boolean;
}
