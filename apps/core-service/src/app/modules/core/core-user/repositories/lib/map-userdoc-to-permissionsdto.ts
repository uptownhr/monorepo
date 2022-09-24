//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreUserPermissionsDTO } from '../../dto';
import type { UserDocument } from '../../schemas/user.schema';

export function mapToUserPermissionsDTO(doc: UserDocument): CoreUserPermissionsDTO {
  return {
    manager: doc.permissions.manager,
    approver: doc.permissions.approver,
    canCancelAccount: doc.permissions.canCancelAccount,
    canRetractSignedPolicies: doc.permissions.canRetractSignedPolicies,
    canEditGlobalPolicies: doc.permissions.canEditGlobalPolicies,
    canViewPayrollTab: doc.permissions.canViewPayrollTab,
  };
}
