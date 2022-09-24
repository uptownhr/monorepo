//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreUserConsumableTokenDTO } from '../../dto/core-user-consumable-token.dto';
import type { ConsumableTokenDocument } from '../../schemas/consumableToken.schema';

export function mapToConsumableTokenDTO(consumableToken: ConsumableTokenDocument): CoreUserConsumableTokenDTO {
  return {
    id: consumableToken._id.toString(),
    user: consumableToken._user.toString(),
    token: consumableToken.token,
    active: consumableToken.active,
    createdAt: consumableToken.created_at,
    expiresAt: consumableToken.expires_at,
    consumedAt: consumableToken.consumed_at,
  };
}
