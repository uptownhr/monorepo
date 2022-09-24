//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { subject } from '@casl/ability';
import { ForbiddenException } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import { chatAbility } from '../../../acl/core-user-chat.acl';
import { FeedbackMessageOutputDTO, FeedbackValueDTO } from '../../../dto/FeedbackMessage.dto';
import { buildChannelId } from '../../../lib/build-channel-id';
import { feedbackValueDtoToModel } from '../../../lib/feedback-dto-to-model';
import { isSendbirdError } from '../../../providers/sendbird-axios.provider';
import { CoreUserService, RawMessageService } from '../../../services';
import { FeedbackMessageService } from '../../../services/feedback-message.service';
import { ChatMessageInterface, SendbirdMessageType } from '../../models/ChatMessage.interface';
import { ChatMessageTypeEnum } from '../../models/ChatMessageType.enum';
import { FeedbackMessage } from '../../models/messages/FeedbackMessage.model';
import { FeedbackMessageInput, FeedbackMessageValuEnum } from '../../models/messages/FeedbackMessageInput.model';

@Resolver(() => FeedbackMessage)
export class FeedbackMessageResolver {
  constructor(
    private coreUserService: CoreUserService,
    private feedbackMessageService: FeedbackMessageService,
    private messageService: RawMessageService,
  ) {}

  @Mutation(() => ChatMessageInterface)
  async sendFeedbackMessage(
    @AuthUser() currentUser: CurrentUser,
    @Args('id', { type: () => GraphQLID }) recipientId: string,
    @Args('message', { type: () => FeedbackMessageInput }) message: FeedbackMessageInput,
  ): Promise<FeedbackMessage | null> {
    // ACL CHECK
    const users = await this.coreUserService.getUsers([currentUser.userId, recipientId]);
    if (users.length !== 2) {
      throw new Error('Did not resolve two users');
    }
    const myAbility = chatAbility(users[0]);
    if (myAbility.can('send-feedback', subject('CoreUserDTO', users[1]))) {
      const res = await this.feedbackMessageService.sendFeedbackMessage({
        channelId: buildChannelId(users[0].id, users[1].id),
        senderId: currentUser.userId, // this is te senderId
        recipientId: users[1].id,
        companyId: currentUser.companyId!,
        message: message.message,
        value: mapModelToEnum(message.value),
      });

      return mapToResponse(res);
    } else {
      throw new ForbiddenException('Cannot send chat messages.');
    }
  }

  @ResolveField()
  async message(@Root() message: FeedbackMessage) {
    await this.#confirmData(message);
    const decoded = JSON.parse(message.rawData.data);
    return decoded.message;
  }

  @ResolveField()
  async value(@Root() message: FeedbackMessage) {
    await this.#confirmData(message);
    const decoded = JSON.parse(message.rawData.data);
    const res = feedbackValueDtoToModel(decoded.value);
    return res;
  }

  @ResolveField()
  async feedbackId(@Root() message: FeedbackMessage) {
    await this.#confirmData(message);
    const decoded = JSON.parse(message.rawData.data);
    return decoded.id;
  }

  async #confirmData(message) {
    if (message.channelId && message.id && !message.rawData) {
      const rawData = await this.messageService.getRawMessage(message.channelId, BigInt(message.id));
      if (!isSendbirdError(rawData)) {
        message.rawData = rawData;
      } else {
        throw rawData;
      }
    }
  }
}

function mapModelToEnum(v: FeedbackMessageValuEnum): FeedbackValueDTO {
  switch (v) {
    case FeedbackMessageValuEnum.AboveExpectations:
      return FeedbackValueDTO.AboveExpectations;
    case FeedbackMessageValuEnum.BelowExpectations:
      return FeedbackValueDTO.BelowExpectations;
    case FeedbackMessageValuEnum.MeetsExpectations:
      return FeedbackValueDTO.MeetsExpectations;
  }
}

function mapToResponse(data: FeedbackMessageOutputDTO): FeedbackMessage {
  return {
    id: data.messageId.toString(),
    isThreadMessage: true,
    isThreadParent: false,
    rawType: SendbirdMessageType.Message,
    rawData: data.raw,
    sender: { id: data.senderId },
    recipient: { id: data.recipientId },
    type: ChatMessageTypeEnum.Feedback,
    createdAt: data.createdAt,
    value: feedbackValueDtoToModel(data.value),
    message: data.message,
    feedbackId: data.feedbackId,
    channelId: data.channelId,
  };
}
