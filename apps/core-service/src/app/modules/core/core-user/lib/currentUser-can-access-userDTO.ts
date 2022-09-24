//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, isSystemUser } from '@bambeehr/authentication';
import { UserRole } from '@bambeehr/consts';
import { isUserBambae } from '../../../../lib/is-user-bambae';
import type { CoreUserDTO } from '../dto/core-user.dto';

/**
 * This is our most basic "can user A see user B" check.
 * - systemUsers (true)
 * - HRM (true)
 * - company owner (true)
 * - user's direct manager (true)
 * - user themselvers (true)
 *
 * @param currentUser Tis
 * @param user
 * @returns
 */
export function currentUserCanAccessUserDTO(currentUser: CurrentUser, user: CoreUserDTO, path?: string) {
  if (isSystemUser(currentUser) || isUserBambae(currentUser)) {
    return true;
  } else if (
    (currentUser.roles.includes(UserRole.CompanyOwner) || currentUser.roles.includes(UserRole.User)) &&
    currentUser.companyId === user.companyId
  ) {
    return true;
  } else if (currentUser.userId === user.employment.managerId) {
    return true;
  } else if (user.id === currentUser.userId) {
    return true;
  } else if (path === 'profile') {
    return currentUser.companyId === user.companyId;
  }
  return false;
}
