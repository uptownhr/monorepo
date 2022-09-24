//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import * as bcrypt from 'bcrypt';

export async function hashString(stringToHash: string): Promise<string> {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(stringToHash, salt);
}
