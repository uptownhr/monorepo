//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { MfaNonceData } from './MfaNonceData';
import type { MfaType } from './MfaType';

export interface SmsNonceData extends MfaNonceData<MfaType.SMS> {
  verifyer: string;
}
