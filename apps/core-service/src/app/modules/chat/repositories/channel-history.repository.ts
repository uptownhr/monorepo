//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { ChannelNotFoundException, UnknownChatException } from '../lib/error';
import { isSendbirdError, SendbirdClient } from '../providers/sendbird-axios.provider';

@Injectable()
export class ChannelHistoryRepository {
  constructor(protected chatClient: SendbirdClient) {}
  async getChannelHistory(channelId: string, afterId?: bigint) {
    return this.chatClient.getChannelHistory(channelId, afterId);
  }

  async getConversationHistory(channelId: string, afterId?: bigint, count = 15) {
    const res = await this.chatClient.getChannelHistory(channelId, afterId, count);
    if (isSendbirdError(res)) {
      if (res.code === 400201 && res.message === `"Channel" not found.`) {
        throw new ChannelNotFoundException(res.message);
      } else {
        throw new UnknownChatException(res);
      }
    }
    return res.messages; // .map(mapHistoryToMessage); // we'll do this later
  }

  async getThreadHistory(channelId: string, parentId: bigint, afterId?: bigint, count = 15) {
    // This may throw a message-not-found exception if there is no parent.
    const res = await this.chatClient.getThreadHistory(channelId, parentId, afterId, count);
    if (isSendbirdError(res)) {
      if (res.code === 400201 && res.message === `"Channel" not found.`) {
        throw new ChannelNotFoundException(res.message);
      } else {
        throw new UnknownChatException(res);
      }
    }
    return res.messages;
  }
}

// function mapHistoryToMessage(h: SendbirdTextMessageResponse): MessageDTO {
//   return {
//     id: h.message_id,
//     createdAt: fromUnixTime(h.created_at),
//     userId: h.user.user_id,
//     data: h.custom_type === ChatMessageType.Text ? h.message : h.data,
//     type: ChatMessageType[h.custom_type],
//   };
// }
