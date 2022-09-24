//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { isUserBambae } from './is-user-bambae';

describe('is-user-bambae', () => {
  test("Returns false when the user doesn't have a honey role", () => {
    const u = {
      roles: [UserRole.Employee],
    };
    expect(isUserBambae(u as any)).toBeFalsy();
  });
  test('Returns false when the user does have a honey role', () => {
    const u = {
      roles: [UserRole.Employee, UserRole.HandbookSpecialist],
    };
    expect(isUserBambae(u as any)).toBeTruthy();
  });
});
