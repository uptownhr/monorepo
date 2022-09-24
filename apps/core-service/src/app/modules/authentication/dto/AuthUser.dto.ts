//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

export class AuthUserDTO {
  readonly id: string;
  readonly currentUserActive: boolean;
  readonly currentUserId: string;
  readonly currentCompanyId?: string;
  readonly active: boolean;
  readonly roles: string[];
  readonly primaryRole: string;
  readonly email: string;
  readonly fullName: string;
  readonly avatarUrl: string;
  readonly userOptions: AuthUserOptionDTO[];
  readonly passwordHash: string;
}

export class AuthUserOptionDTO {
  readonly userId: string;
  readonly active: boolean;
  readonly companyId: string;
  readonly companyName: string;
}
