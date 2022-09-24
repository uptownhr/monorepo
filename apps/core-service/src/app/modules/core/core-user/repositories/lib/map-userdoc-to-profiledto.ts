//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { AuthDocument } from '../../../core-auth/schemas/core-auth.schema';
import type { CoreUserProfileDTO } from '../../dto';
import type { UserDocument } from '../../schemas/user.schema';
import { mapToAddressDTO } from './map-userdoc-to-addressdto';

export function mapToUserProfileDTO(userDoc: UserDocument, authDoc: AuthDocument): CoreUserProfileDTO {
  return {
    email: authDoc.email,
    firstName: userDoc.profile.first_name,
    lastName: userDoc.profile.last_name,
    phone: userDoc.profile.phone,
    dob: userDoc.profile.dob,
    address: mapToAddressDTO(userDoc),
    avatarUrl: userDoc.profile.avatar_url,
    emergencyContact: {
      name: userDoc.profile.emergency_contact.name,
      email: userDoc.profile.emergency_contact.email,
      phone: userDoc.profile.emergency_contact.phone,
      relationship: userDoc.profile.emergency_contact.relationship,
    },
  };
}
