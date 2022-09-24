//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { UserGroupType } from '../types/UserGroupType';

export interface UserGroupDTO {
  readonly id: string;
  readonly ownerId?: string;
  readonly name: string;
  readonly type: UserGroupType;
  readonly members: string[];
}
