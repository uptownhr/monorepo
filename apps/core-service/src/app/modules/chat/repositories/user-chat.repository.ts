//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import type { SendTextMessageDTO } from '../dto/SendTextMessage.dto';
import type { UserChatConfigDTO } from '../dto/UserChatConfig.dto';
import {
  ChannelNotFoundException,
  ChatUserNotFoundException,
  ChatUserNotMemberException,
  UnknownChatException,
} from '../lib/error';
import { isSendbirdError, SendbirdClient } from '../providers/sendbird-axios.provider';
import { ChatMessageType } from '../types/ChatMessageType';
import type { SendbirdTextMessageResponse } from '../types/sendbird';

@Injectable()
export class UserChatRepository {
  constructor(private client: SendbirdClient) {}
  async getUserChatConfig(userId: string): Promise<UserChatConfigDTO> {
    const d = await this.client.getUser(userId);
    if (isSendbirdError(d)) {
      if (d.code === 400201) {
        throw new ChatUserNotFoundException();
      } else {
        throw new UnknownChatException(d);
      }
    }

    return {
      accessToken: d.access_token,
    };
  }

  async enrollUser(userId: string): Promise<UserChatConfigDTO> {
    const d = await this.client.enrollUser(userId);
    if (isSendbirdError(d)) {
      throw new UnknownChatException(d);
    }

    return {
      accessToken: d.access_token,
    };
  }

  async sendMessage(payload: SendTextMessageDTO): Promise<SendbirdTextMessageResponse> {
    let res;
    if (payload.threadParentId) {
      res = this.client.sendCustomMessageToThread(
        payload.channelId,
        payload.threadParentId,
        payload.senderId,
        payload.type,
        undefined,
        payload.data,
      );
    } else {
      if (payload.type === ChatMessageType.Text) {
        res = await this.client.sendCustomMessage(
          payload.channelId,
          payload.senderId,
          payload.type,
          undefined,
          payload.data,
        );
      } else {
        res = await this.client.sendCustomMessage(payload.channelId, payload.senderId, payload.type, payload.data);
      }
    }

    if (isSendbirdError(res)) {
      if (res.code === 400201 && res.message === `"Channel" not found.`) {
        throw new ChannelNotFoundException(res.message);
      } else if (res.code === 400201 && res.message === `"User" not found.`) {
        throw new ChatUserNotFoundException(res.message);
      } else if (res.code === 400108) {
        throw new ChatUserNotMemberException(res.message);
      } else {
        throw new UnknownChatException(res);
      }
    } else {
      return res;
    }
  }
}
