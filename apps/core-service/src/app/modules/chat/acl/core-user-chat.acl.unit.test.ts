//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { subject } from '@casl/ability';
import { createMock } from 'ts-auto-mock';
import type { CoreUserDTO } from '../../core/core-user/dto';
import { chatAbility } from './core-user-chat.acl';

describe('Core User Chat ACLs', () => {
  describe('Users at different companies', () => {
    it('Owners cannot chat with each other', () => {
      const me = createMock<CoreUserDTO>({
        companyId: 'my-company',
        roles: ['company-owner', 'user'],
        active: true,
      });
      const you = createMock<CoreUserDTO>({
        companyId: 'your-company',
        active: true,
      });
      const ability = chatAbility(me);

      expect(ability.can('read-conversation', subject('CoreUserDTO', you))).toBeFalsy();
      expect(ability.can('start-chat', subject('CoreUserDTO', you))).toBeFalsy();
    });
    it('Admins cannot chat with each other', () => {
      const me = createMock<CoreUserDTO>({
        companyId: 'my-company',
        roles: ['user'],
        active: true,
      });
      const you = createMock<CoreUserDTO>({
        companyId: 'your-company',
        active: true,
      });
      const ability = chatAbility(me);

      expect(ability.can('read-conversation', subject('CoreUserDTO', you))).toBeFalsy();
      expect(ability.can('start-chat', subject('CoreUserDTO', you))).toBeFalsy();
    });
  });

  describe('Users at the same company', () => {
    it('Owner can read history, and start chat with anybody', () => {
      const me = createMock<CoreUserDTO>({
        companyId: 'my-company',
        roles: ['company-owner', 'user'],
        active: true,
      });
      const you = createMock<CoreUserDTO>({
        companyId: 'my-company',
        active: true,
      });
      const ability = chatAbility(me);

      expect(ability.can('read-conversation', subject('CoreUserDTO', you))).toBeTruthy();
      expect(ability.can('start-chat', subject('CoreUserDTO', you))).toBeTruthy();
    });
  });
});
