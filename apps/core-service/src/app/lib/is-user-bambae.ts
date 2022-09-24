//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2021,2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { allHoneyRoles } from '@bambeehr/consts';

export function isUserBambae(currentUser: CurrentUser): boolean {
  return allHoneyRoles.some((r) => currentUser.roles.includes(r));
}
