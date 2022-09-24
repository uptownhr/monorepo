//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import type { FeedbackHistoryRequestDTO } from '../dto/FeedbackHistoryRequest.dto';
import type { FeedbackMessageInputDTO, FeedbackMessageOutputDTO } from '../dto/FeedbackMessage.dto';
import { buildChannelId } from '../lib/build-channel-id';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { ChatMessageType } from '../types/ChatMessageType';
import { UserChatService } from './user-chat.service';

@Injectable()
export class FeedbackMessageService {
  constructor(private chatService: UserChatService, protected feedbackRepo: FeedbackRepository) {}

  async sendFeedbackMessage(payload: FeedbackMessageInputDTO): Promise<FeedbackMessageOutputDTO> {
    const feedbackId = await this.feedbackRepo.createFeedback(payload.senderId, payload.recipientId, payload.value);

    const channelId = buildChannelId(payload.senderId, payload.recipientId);
    const message = await this.chatService.sendMessage({
      channelId,
      type: ChatMessageType.Feedback,
      senderId: payload.senderId,
      recipientId: payload.recipientId,
      companyId: payload.companyId,
      data: JSON.stringify({
        id: feedbackId,
        value: payload.value,
        message: payload.message,
      }),
    });

    await this.feedbackRepo.updateFeedback(feedbackId, message.message_id, message.channel_url, payload.message);
    return {
      channelId,
      createdAt: new Date(message.created_at),
      message: payload.message,
      messageId: message.message_id,
      recipientId: payload.recipientId,
      senderId: payload.senderId,
      value: payload.value,
      feedbackId,
      raw: message,
    };
  }

  async getUserFeedback(request: FeedbackHistoryRequestDTO) {
    return this.feedbackRepo.getUserFeedback(request.userId, request.count);
  }
}
