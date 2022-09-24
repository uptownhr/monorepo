//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreAddressDTO } from '../../../dto/core-address.dto';
import type { UserDocument } from '../../schemas/user.schema';

export function mapToAddressDTO(doc: UserDocument): CoreAddressDTO {
  return {
    line1: doc.profile.address,
    line2: doc.profile.address2,
    city: doc.profile.city,
    state: doc.profile.state,
    zipCode: doc.profile.zip,
  };
}
