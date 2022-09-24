//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreAddressDTO } from '../../dto/core-address.dto';
import type { CoreUserProfileEmergencyContactDTO } from './core-user-profile-emergency-contact.dto';

export interface CoreUserProfileDTO {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly address?: CoreAddressDTO;
  readonly dob?: Date;
  readonly email: string;
  readonly avatarUrl: string;

  readonly emergencyContact: CoreUserProfileEmergencyContactDTO;
}
