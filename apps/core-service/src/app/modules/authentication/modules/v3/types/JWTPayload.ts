//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface JWTPayload {
  userId: string;
  authId: string;
}

export function isJwtPayload(claim: unknown): claim is JWTPayload {
  return Object.prototype.hasOwnProperty.call(claim, 'authId') && Object.prototype.hasOwnProperty.call(claim, 'userId');
}
