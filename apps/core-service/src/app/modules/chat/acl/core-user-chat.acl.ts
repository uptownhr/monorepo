//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { UserRole } from '@bambeehr/consts';
import { Ability, AbilityBuilder } from '@casl/ability';
import type { CoreUserDTO } from '../../core/core-user/dto';
import type { CoreUserChatConfig } from '../graphql/models/CoreUserChatConfig.model';

type Actions = 'read' | 'start-chat' | 'send-feedback' | 'read-conversation' | 'read-feedback';
type Subjects =
  | typeof CoreUserDTO
  | CoreUserDTO
  | 'CoreUserDTO'
  | typeof CoreUserChatConfig
  | CoreUserChatConfig
  | 'CoreUserChatConfig';

export type CoreUserDTOAbility = Ability<[Actions, Subjects]>;

export function chatAbility(currentUser: CoreUserDTO) {
  const { can, rules, cannot } = new AbilityBuilder<CoreUserDTOAbility>(Ability);

  /**
   * Only being supported on staging at the moment
   */
  /* istanbul ignore if */
  if (!['stage', 'local'].includes(process.env.APP_ENV as string) && process.env.NODE_ENV !== 'test') {
    cannot('start-chat', 'CoreUserDTO').because('Only allowed on stage');
    cannot('read-conversation', 'CoreUserDTO').because('Only allowed on stage');
    cannot('read', 'CoreUserChatConfig').because('Only allowed on stage');
    cannot('read-feedback', 'CoreUserChatConfig').because('Only allowed on stage');
    return new Ability<[Actions, Subjects]>(rules);
  }

  /* istanbul ignore else */
  if (currentUser.roles.includes(UserRole.CompanyOwner)) {
    can('read-conversation', 'CoreUserDTO', { companyId: currentUser.companyId }).because(
      'The owner of a company can read a chat with all employees',
    );
    can('start-chat', 'CoreUserDTO', { companyId: currentUser.companyId, active: true }).because(
      'The owner of a company can start a chat with all employees',
    );
    // temporary
    can('send-feedback', 'CoreUserDTO', { companyId: currentUser.companyId, active: true }).because(
      'The Company Admin can start a chat with all employees',
    );
  }

  /* istanbul ignore else */
  if (currentUser.roles.includes(UserRole.User)) {
    can('read-conversation', 'CoreUserDTO', { companyId: currentUser.companyId }).because(
      'The Company Admin can read conversation with all employees',
    );
    can('start-chat', 'CoreUserDTO', { companyId: currentUser.companyId, active: true }).because(
      'The Company Admin can start a chat with all employees',
    );
    // temporary
    can('send-feedback', 'CoreUserDTO', { companyId: currentUser.companyId, active: true }).because(
      'The Company Admin can start a chat with all employees',
    );
  }

  // manager
  can('read-conversation', 'CoreUserDTO', {
    'employment.managerId': currentUser.id,
    companyId: currentUser.companyId,
  }).because('A manager can start a conversation with their direct reports');
  can('start-chat', 'CoreUserDTO', {
    'employment.managerId': currentUser.id,
    companyId: currentUser.companyId,
  }).because('A manager can start a conversation with their direct reports');
  can('send-feedback', 'CoreUserDTO', {
    'employment.managerId': currentUser.id,
    companyId: currentUser.companyId,
  }).because('A send a feedback message to their employee');

  // employees
  can('start-chat', 'CoreUserDTO', {
    id: currentUser.employment.managerId,
    companyId: currentUser.companyId,
    active: true,
  }).because('I can start a conversation with my manager');

  can('read-conversation', 'CoreUserDTO', {
    id: currentUser.employment.managerId,
    companyId: currentUser.companyId,
  }).because('I can start a conversation with my manager');

  can('read', 'CoreUserChatConfig', { id: currentUser.id }).because('Only the user can see their chat configuration');

  // You can't start a chat with yourself
  cannot(['read-conversation', 'start-chat', 'send-feedback'], 'CoreUserDTO', { id: currentUser.id }).because(
    'You cannot have a conversation with just yourself',
  );

  cannot(['read-conversation', 'start-chat', 'send-feedback'], 'CoreUserDTO', { active: false }).because(
    'You cannot have a conversation with just yourself',
  );
  cannot(['read-conversation', 'start-chat', 'send-feedback'], 'CoreUserDTO', {
    companyId: { $ne: currentUser.companyId },
  }).because('You cannot have a conversation outside of your comapny');

  return new Ability<[Actions, Subjects]>(rules);
}
