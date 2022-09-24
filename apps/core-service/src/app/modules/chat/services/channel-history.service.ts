//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { ChannelNotFoundException, ChatUserNotFoundException } from '../lib/error';
import { ChannelHistoryRepository, ChannelRepository, UserChatRepository } from '../repositories';

export interface GetHistoryPayload {
  channelId: string;
  userId: string;
  companyId: string;
  count?: number;
  afterId?: bigint;
}

export interface GetThreadHistoryPayload extends GetHistoryPayload {
  parentId: bigint;
}

function isThreadHistory(t: GetHistoryPayload | GetThreadHistoryPayload): t is GetThreadHistoryPayload {
  return Object.prototype.hasOwnProperty.call(t, 'parentId');
}
@Injectable()
export class ChannelHistoryService {
  constructor(
    private historyRepo: ChannelHistoryRepository,
    private channelRepo: ChannelRepository,
    private userChatRepo: UserChatRepository,
  ) {}

  async getOneOnOneHistory(payload: GetHistoryPayload) {
    return this.#getChannelHistory(payload);
  }

  async getThreadHistory(payload: GetThreadHistoryPayload) {
    return this.#getChannelHistory(payload);
  }

  #getHistoryInternal<T extends GetHistoryPayload>(payload: T) {
    if (isThreadHistory(payload)) {
      return this.historyRepo.getThreadHistory(payload.channelId, payload.parentId, payload.afterId, payload.count);
    } else {
      return this.historyRepo.getConversationHistory(payload.channelId, payload.afterId, payload.count);
    }
  }
  async #getChannelHistory<T extends GetHistoryPayload>(payload: T) {
    try {
      return await this.#getHistoryInternal(payload);
    } catch (error) {
      if (error instanceof ChannelNotFoundException) {
        await this.#createChannelAndRetry(payload);
        return await this.#getHistoryInternal(payload);

        // send the message again
      } else if (error instanceof ChatUserNotFoundException) {
        await this.#enrollUserAndRetry(payload);
        return await this.#getHistoryInternal(payload);
      }
    }
  }

  async #createChannelAndRetry<T extends GetHistoryPayload>(payload: T) {
    try {
      await this.channelRepo.createChannel(payload.channelId, payload.companyId, [payload.userId]);
    } catch (err) {
      if (err instanceof ChatUserNotFoundException) {
        await this.userChatRepo.enrollUser(payload.userId);
        await this.channelRepo.createChannel(payload.channelId, payload.companyId, [payload.userId]);
      }
    }
  }

  async #enrollUserAndRetry<T extends GetHistoryPayload>(payload: T) {
    try {
      await this.userChatRepo.enrollUser(payload.userId);
      await this.channelRepo.addUserToChannel(payload.channelId, payload.userId);
    } catch (e) {
      // noo[p]
    }
  }
}
