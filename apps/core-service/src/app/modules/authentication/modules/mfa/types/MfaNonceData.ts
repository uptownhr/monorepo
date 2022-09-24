//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { MfaType } from './MfaType';

export interface MfaNonceData<T = MfaType> {
  authId: string;
  challengeId: string;
  device: string;
  deviceId: string;
  configId: string;
  type: T;
}
