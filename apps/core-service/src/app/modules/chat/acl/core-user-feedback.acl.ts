//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { Ability, AbilityBuilder } from '@casl/ability';
import type { CoreUserDTO } from '../../core/core-user/dto';
import type { FeedbackDto } from '../repositories/feedback.repository';

type FeedbackActions = 'read-feedback' | 'send-feedback';
type FeedbackSubjects =
  | typeof FeedbackDto
  | FeedbackDto
  | 'FeedbackDto'
  | typeof CoreUserDTO
  | CoreUserDTO
  | 'CoreUserDTO';

export type FeedbackDTOAbility = Ability<[FeedbackActions, FeedbackSubjects]>;

export function feedbackAbility(currentUser: CoreUserDTO) {
  const { can, rules, cannot } = new AbilityBuilder<FeedbackDTOAbility>(Ability);

  if (!['stage', 'local'].includes(process.env.APP_ENV as string) && process.env.NODE_ENV !== 'test') {
    cannot('send-feedback', 'FeedbackDto').because('Only allowed on stage');
    return new Ability<[FeedbackActions, FeedbackSubjects]>(rules);
  }

  if (currentUser.roles.includes(UserRole.CompanyOwner)) {
    can('send-feedback', 'CoreUserDTO', { companyId: currentUser.companyId, active: true }).because(
      'The owner can send feedback to all employees',
    );
    can('read-feedback', 'CoreUserDTO', { companyId: currentUser.companyId }).because(
      'The owner can see all employee feedback',
    );
  }
  if (currentUser.roles.includes(UserRole.User)) {
    can('send-feedback', 'CoreUserDTO', { companyId: currentUser.companyId, active: true }).because(
      'The owner can send feedback to all employees',
    );
    can('read-feedback', 'CoreUserDTO', { companyId: currentUser.companyId }).because(
      'The admin can see all employee feedback',
    );
  }

  can('read-feedback', 'FeedbackDto', { senderId: currentUser.id });
  can('read-feedback', 'FeedbackDto', { recipientId: currentUser.id });

  return new Ability<[FeedbackActions, FeedbackSubjects]>(rules);
}
