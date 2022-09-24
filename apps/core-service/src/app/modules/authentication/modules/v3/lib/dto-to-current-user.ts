//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';

export function dtoToCurrentUser(authUser: AuthUserDTO, generatedDeviceId?: string): Omit<CurrentUser, 'tokenType'> {
  const payload = {
    // [securityId]: 'api-v2-access-token',
    email: authUser.email,
    name: authUser.fullName,
    avatarUrl: authUser.avatarUrl,
    authId: authUser.id,
    userId: authUser.currentUserId,
    companyId: authUser.currentCompanyId || 'undefined',
    roles: authUser.roles,
    deviceId: generatedDeviceId,
  };

  return payload;
}
