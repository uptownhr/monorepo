//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreUser } from '../../../../core-user/graphql/models/user.model';

export function mapRecipients(userIds: readonly string[]): Array<Pick<CoreUser, 'id'>> {
  return userIds.map((u) => ({ id: u }));
}
