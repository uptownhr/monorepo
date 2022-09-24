//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { MfaType } from '../types/MfaType';

export interface MfaConfigDTO<ConfigType> {
  readonly id: string;
  readonly authId: string;
  readonly type: MfaType;
  readonly createdAt: Date;
  readonly confirmedAt?: Date | null;
  readonly configuration: ConfigType;
  readonly backupCode?: string;
}

export type SmsConfigType = {
  readonly phoneNumber: string;
};

export type MfaSMSConfigDTO = MfaConfigDTO<SmsConfigType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSmsConfig(config: MfaConfigDTO<any>): config is MfaSMSConfigDTO {
  return config.type === MfaType.SMS;
}
