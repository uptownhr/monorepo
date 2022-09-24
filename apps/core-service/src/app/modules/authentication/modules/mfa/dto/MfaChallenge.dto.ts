//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface MfaChallengeDTO {
  readonly authId: string;
  readonly deviceId: string;
  readonly device: string;
  readonly challengeId: string;
  readonly createdAt: Date;
  readonly rememberUntil: Date;
}
