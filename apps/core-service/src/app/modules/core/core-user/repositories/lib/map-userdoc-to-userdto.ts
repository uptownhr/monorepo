//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { mapAuthDocumentToAuthDTO } from '../../../core-auth/repositories/map-authdocument-to-authdto';
import type { AuthDocument } from '../../../core-auth/schemas/core-auth.schema';
import { mapCompanyDocToCompanyDto } from '../../../core-company/repositories/lib/map-to-company-dto';
import type { CompanyDocument } from '../../../core-company/schemas/core-company.schema';
import type { CoreUserDTO } from '../../dto';
import type { UserDocument } from '../../schemas/user.schema';
import { mapToUserEmploymentDTO } from './map-userdoc-to-employmentdto';
import { mapToUserPermissionsDTO } from './map-userdoc-to-permissionsdto';
import { mapToUserProfileDTO } from './map-userdoc-to-profiledto';
import { mapToUserSettingsDTO } from './map-userdoc-to-settingsdto';
import { mapToUserStatesDTO } from './map-userdoc-to-statesdto';

export function mapUserdocToUserDTO(
  userDoc: UserDocument,
  authDoc: AuthDocument,
  companyDoc: CompanyDocument,
): CoreUserDTO {
  const roles = [userDoc.role];
  if (userDoc._id.equals(companyDoc._owner)) {
    roles.push(UserRole.CompanyOwner);
  }

  return {
    id: userDoc._id.toString(),
    companyId: companyDoc._id.toString(),
    active: userDoc.active,
    createdAt: userDoc.created_at,
    primaryRole: userDoc.role,
    roles,
    timeZone: userDoc.profile.timezone,
    profile: mapToUserProfileDTO(userDoc, authDoc),
    employment: mapToUserEmploymentDTO(userDoc),
    settings: mapToUserSettingsDTO(userDoc),
    states: mapToUserStatesDTO(userDoc),
    permissions: mapToUserPermissionsDTO(userDoc),

    // Since auth is already available in this context, we preemptively make it available.
    _auth: mapAuthDocumentToAuthDTO(authDoc),
    _company: mapCompanyDocToCompanyDto(companyDoc),
  };
}
