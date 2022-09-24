//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { registerEnumType } from '@nestjs/graphql';
import { MfaType } from '../../types/MfaType';

export enum AuthMfaType {
  SMS = 'sms',
  BACKUP = 'backup',
  PASSWORD = 'password',
}

registerEnumType(AuthMfaType, {
  name: 'AuthMfaType',
  valuesMap: {
    SMS: {
      description: 'Perform MFA verification via SMS text message',
    },
    BACKUP: {
      description:
        'The backup code (which should be printed and securely stored!) in case the phone number becomes unavailable.',
    },
    PASSWORD: {
      description:
        'Certain challenges (like creating an MFA enrollment, or running a process without any other MFA) require using a password.',
    },
  },
});

export function fromMfaType(t: MfaType) {
  switch (t) {
    case MfaType.SMS:
      return AuthMfaType.SMS;
    case MfaType.BACKUP:
      return AuthMfaType.BACKUP;
    case MfaType.PASSWORD:
      return AuthMfaType.PASSWORD;
  }
}

export function toMfaType(t: AuthMfaType) {
  switch (t) {
    case AuthMfaType.SMS:
      return MfaType.SMS;
    case AuthMfaType.BACKUP:
      return MfaType.BACKUP;
    case AuthMfaType.PASSWORD:
      return MfaType.PASSWORD;
  }
}
