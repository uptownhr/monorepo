//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface AuthConfig {
  jwtPublicKey: string;
  internalPublicKey: string;
  jwtSigningKey: string;
  masqSigningKey: string;
  jwtExpiresIn: string;
}
