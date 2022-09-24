//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface MfaChallengeAttemptDTO {
  readonly authId: string;
  readonly deviceId: string;
  readonly challengeId: string;
  readonly configId: string;
  readonly rememberUntil?: Date;
}
