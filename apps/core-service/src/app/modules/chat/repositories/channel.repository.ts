//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { ChannelNotFoundException, ChatUserNotFoundException, UnknownChatException } from '../lib/error';
import { isSendbirdError, SendbirdClient } from '../providers/sendbird-axios.provider';
import type { SendbirdChannelResponse } from '../types/sendbird';

@Injectable()
export class ChannelRepository {
  constructor(protected chatClient: SendbirdClient) {}
  async createChannel(channelId: string, companyId: string, userIds: string[]) {
    const channel = await this.chatClient.createChannel(channelId, companyId, userIds);
    if (isSendbirdError(channel)) {
      if (channel.code === 400201 && channel.message === `"User" not found.`) {
        throw new ChatUserNotFoundException(channel.message);
      } else {
        throw new UnknownChatException(channel);
      }
    }
  }

  async addUserToChannel(channelId: string, userId: string) {
    const res = await this.chatClient.addUserToChannel(channelId, userId);
    if (isSendbirdError(res)) {
      if (res.code === 400201 && res.message === `"Channel" not found.`) {
        throw new ChannelNotFoundException(res.message);
      } else if (res.code === 400201 && res.message === `"User" not found.`) {
        throw new ChatUserNotFoundException(res.message);
      } else {
        throw new UnknownChatException(res);
      }
    }
  }

  async getExistingConversations(userId: string, recipients: string[]): Promise<SendbirdChannelResponse[]> {
    let accum: SendbirdChannelResponse[] = [];
    const res = await this.chatClient.getUserChannels(userId, recipients);
    if (isSendbirdError(res)) {
      if (res.code === 400201 && res.message === `"Channel" not found.`) {
        throw new ChannelNotFoundException(res.message);
      } else if (res.code === 400201 && res.message === `"User" not found.`) {
        throw new ChatUserNotFoundException(res.message);
      } else {
        throw new UnknownChatException(res);
      }
    } else {
      accum = res.channels;
      let token = res.next;
      while (token) {
        const next = await this.chatClient.getUserChannels(userId, recipients, token);
        if (isSendbirdError(next)) {
          if (next.code === 400201 && next.message === `"Channel" not found.`) {
            throw new ChannelNotFoundException(next.message);
          } else if (next.code === 400201 && next.message === `"User" not found.`) {
            throw new ChatUserNotFoundException(next.message);
          } else {
            throw new UnknownChatException(next);
          }
        } else {
          accum = accum.concat(next.channels);
          token = next.next;
        }
      }
    }

    return accum;
  }
}
