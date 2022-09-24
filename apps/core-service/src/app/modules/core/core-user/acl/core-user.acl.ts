//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { UserRole } from '@bambeehr/consts';
import { Ability, AbilityBuilder } from '@casl/ability';
import { isUserBambae } from '../../../../lib/is-user-bambae';
import type { CoreUserDTO } from '../dto';

type Actions = 'read' | 'update';
type Subjects = typeof CoreUserDTO | CoreUserDTO | 'CoreUserDTO';

export type CoreUserDTOAbility = Ability<[Actions, Subjects]>;

export function userDtoAbility(currentUser: CurrentUser) {
  const { can, cannot, rules } = new AbilityBuilder<CoreUserDTOAbility>(Ability);

  if (isUserBambae(currentUser)) {
    can('read', 'CoreUserDTO').because('An HRM can see anything');
    can('update', 'CoreUserDTO').because('An HRM can update almost anything');
    cannot('update', 'CoreUserDTO', 'profile.email').because('Emails are dangerous');
    return new Ability<[Actions, Subjects]>(rules);
  }

  cannot('read', 'CoreUserDTO', { companyId: { $ne: currentUser.companyId } }).because(
    'Cannot view details of employees at another company',
  );

  if (currentUser.roles.includes(UserRole.CompanyOwner)) {
    can('read', 'CoreUserDTO', { companyId: currentUser.companyId }).because(
      'The owner of a company can see everything',
    );
    can('update', 'CoreUserDTO', ['employment.*'], { companyId: currentUser.companyId }).because(
      'The owner of a company can users employment information',
    );
  } else if (currentUser.roles.includes(UserRole.User)) {
    can('read', 'CoreUserDTO', { companyId: currentUser.companyId }).because(
      'A Company Admin can see everything of a company can see everything',
    );
    can('update', 'CoreUserDTO', ['employment.*'], { companyId: currentUser.companyId }).because(
      'A Company Admin can update a users employment information',
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/naming-convention
    can('read', 'CoreUserDTO', { 'employment.managerId': currentUser.userId } as any);
    can('read', 'CoreUserDTO', { id: currentUser.userId });

    /** currently unsupported when using currentUser as it does not contain managerId
   * can('start-chat', 'CoreUserDTO', { 'id': currentUser.managerId } as any).because(
      'I can start a conversation with my manager',
    );
   */
    // employee on employee permissions
    can(
      'read',
      'CoreUserDTO',
      ['id', 'profile.id', 'profile.firstName', 'profile.lastName', 'profile.avatarUrl', 'employment.title'],
      {
        companyId: currentUser.companyId,
      },
    );
  }

  return new Ability<[Actions, Subjects]>(rules);
}
