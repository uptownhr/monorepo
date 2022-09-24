//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import type { SendTextMessageDTO } from '../dto/SendTextMessage.dto';
import { ChannelNotFoundException, ChatUserNotFoundException, ChatUserNotMemberException } from '../lib/error';
import { isSendbirdError } from '../providers/sendbird-axios.provider';
import { ChannelRepository, UserChatRepository } from '../repositories';
import type { SendbirdTextMessageResponse } from '../types/sendbird';

@Injectable()
export class UserChatService {
  constructor(
    private userChatRepo: UserChatRepository,
    private channelRepo: ChannelRepository,
    @Inject('LOGGER') private logger: Logger,
  ) {}

  async getConfig(userId: string) {
    try {
      return await this.userChatRepo.getUserChatConfig(userId);
    } catch (err) {
      if (isSendbirdError(err)) {
        // something
        this.logger.warn('Sendbird error', err);
        // user not found.  Should we enroll?
        if (err.code === 400201) {
          return this.userChatRepo.enrollUser(userId);
        }
      }
    }
  }

  async getExistingConversations(userId: string, recipients: string[]) {
    try {
      return await this.channelRepo.getExistingConversations(userId, recipients);
    } catch (e) {
      return [];
    }
  }

  async #createChannelAndRetry(payload: SendTextMessageDTO) {
    try {
      await this.channelRepo.createChannel(payload.channelId, payload.companyId, [payload.senderId]);
    } catch (err) {
      if (err instanceof ChatUserNotFoundException) {
        await this.userChatRepo.enrollUser(payload.senderId);
        await this.channelRepo.createChannel(payload.channelId, payload.companyId, [payload.senderId]);
      }
    }
  }

  async #enrollUserAndRetry(payload: SendTextMessageDTO) {
    try {
      await this.userChatRepo.enrollUser(payload.senderId);
      await this.channelRepo.addUserToChannel(payload.channelId, payload.senderId);
    } catch (e) {
      // noo[p]
    }
  }

  async #addUserToChannelAndRetry(payload: SendTextMessageDTO) {
    await this.channelRepo.addUserToChannel(payload.channelId, payload.senderId);
    return this.userChatRepo.sendMessage(payload);
  }

  async sendMessage(payload: SendTextMessageDTO): Promise<SendbirdTextMessageResponse> {
    try {
      return await this.userChatRepo.sendMessage(payload);
    } catch (error) {
      if (error instanceof ChannelNotFoundException) {
        await this.#createChannelAndRetry(payload);
        return this.userChatRepo.sendMessage(payload);

        // send the message again
      } else if (error instanceof ChatUserNotFoundException) {
        await this.#enrollUserAndRetry(payload);
        return this.userChatRepo.sendMessage(payload);
      } else if (error instanceof ChatUserNotMemberException) {
        await this.#addUserToChannelAndRetry(payload);
        return this.userChatRepo.sendMessage(payload);
      } else {
        throw error;
      }
    }
  }
}
