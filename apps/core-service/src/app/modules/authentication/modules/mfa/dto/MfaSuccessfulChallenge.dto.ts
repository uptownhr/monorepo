//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { MfaChallengeDTO } from './MfaChallenge.dto';

export interface MfaSuccessfulChallengeDTO extends MfaChallengeDTO {
  readonly reason: string;
  readonly succeededAt: Date;
}
