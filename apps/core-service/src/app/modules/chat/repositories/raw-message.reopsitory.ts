//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { SendbirdClient } from '../providers/sendbird-axios.provider';

@Injectable()
export class RawMessageRepository {
  constructor(private client: SendbirdClient) {}

  async getRawMessage(channelId: string, messageId: bigint) {
    return this.client.getMessage(channelId, messageId);
  }
}
