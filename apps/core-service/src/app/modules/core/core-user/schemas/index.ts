//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ConsumableToken, ConsumableTokenSchema } from './consumableToken.schema';
import { PartnerUser, PartnerUserSchema } from './partner-user.schema';
import { User, UserSchema } from './user.schema';

export const modelDefinitions = [
  { name: User.name, schema: UserSchema },
  { name: PartnerUser.name, schema: PartnerUserSchema },
  { name: ConsumableToken.name, schema: ConsumableTokenSchema },
];
