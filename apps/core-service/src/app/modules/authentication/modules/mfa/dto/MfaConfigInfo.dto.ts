//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { MfaConfigDTO } from './MfaConfig.dto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface MfaConfigInfoDTO<T = any> extends MfaConfigDTO<T> {
  readonly lastConfirmedAt?: Date;
  readonly lastConfimedDevice?: string;
}
