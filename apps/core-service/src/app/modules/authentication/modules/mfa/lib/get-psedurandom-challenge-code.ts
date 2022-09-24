//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import * as crypto from 'node:crypto';
export const CHALLENGE_CHARS = '1234567890';
export const BACKUP_CHARS = '23456789ABCDEFGHKMNPQRSTWXYZ';

export function getPseudorandomChallengeCode(length = 6, chars = CHALLENGE_CHARS) {
  if (process.env.NODE_ENV === 'test') {
    chars = '0';
  }
  const bytes = crypto.randomBytes(length);
  let cursor = 0;
  const result: string[] = new Array(length);

  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    cursor += bytes[i];
    result[i] = chars[cursor % charsLength];
  }
  return result.join('');
}
