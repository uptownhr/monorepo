//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface CoreUserConsumableTokenDTO {
  readonly id: string;
  readonly user: string;
  readonly token: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly expiresAt: Date;
  readonly consumedAt: Date;
}
