//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { RawMessageRepository } from '../repositories/raw-message.reopsitory';

@Injectable()
export class RawMessageService {
  constructor(private messageRepo: RawMessageRepository) {}

  async getRawMessage(channelId: string, messageId: bigint) {
    return this.messageRepo.getRawMessage(channelId, messageId);
  }
}
