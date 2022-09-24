//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface CoreAuthInternalUserOptionsDTO {
  readonly userId: string;
  readonly companyId: string;
  readonly companyName: string;
  readonly active: boolean;
}

export interface CoreAuthInternalDTO {
  readonly id: string;
  readonly email: string;
  readonly currentUserId: string;
  readonly currentCompanyId?: string;
  readonly roles: string[];
  readonly authActive: boolean;
  readonly userActive: boolean;
  readonly avatarUr: string;
  readonly primaryRole: string;
  readonly fullName: string;
  readonly userOptions: CoreAuthInternalUserOptionsDTO[];
  readonly passwordHash: string;
}
