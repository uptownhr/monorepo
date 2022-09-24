//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { SendbirdChannelResponse } from './SendbirdChannelResponse';

export interface SendbirdListMyGroupChannelsResponse {
  channels: SendbirdChannelResponse[];
  next: string;
}
