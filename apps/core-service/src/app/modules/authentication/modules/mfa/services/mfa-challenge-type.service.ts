//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { add } from 'date-fns';
import { MfaType } from '../types/MfaType';
@Injectable()
export class MfaChallengeTypeService {
  async validTypesForReason(reason: string): Promise<MfaType[]> {
    switch (reason) {
      /**
       * Password is already necessary to log in, and cannot be used as an MFA challenge
       */
      case 'login':
        return Object.values(MfaType).filter((t) => t !== MfaType.PASSWORD);

      /**
       * In general, backup code is only available when completely locked out of all other reasons.
       */
      default:
        return Object.values(MfaType).filter((t) => t !== MfaType.BACKUP);
    }
  }

  async rememberUntilForReason(reason: string): Promise<Date> {
    switch (reason) {
      case 'login':
        return add(new Date(), { days: 30 });
      default:
        return new Date();
    }
  }
}
