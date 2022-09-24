//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ObjectId } from 'bson';
import { ChannelHistoryService } from '.';
import { withLogger } from '../../../__tests__/test-helper';
import { buildChannelId } from '../lib/build-channel-id';
import { withMockChatClient } from '../providers/sendbird-axios.provider.mock';
import { ChannelHistoryRepository, ChannelRepository, UserChatRepository } from '../repositories';
import { ChatMessageType } from '../types/ChatMessageType';
import { UserChatService } from './user-chat.service';

describe('Chat History Service', () => {
  describe('Sending a one-on-one message', () => {
    it('should be empty if no messages sent or chanenl created', async () => {
      const client = withMockChatClient();
      const chatRepo = new UserChatRepository(client);
      const channelRepo = new ChannelRepository(client);
      const chatService = new UserChatService(chatRepo, channelRepo, withLogger());

      const historyRepo = new ChannelHistoryRepository(client);
      const historyService = new ChannelHistoryService(historyRepo, channelRepo, chatRepo);

      const userId1 = new ObjectId().toString();
      const userId2 = new ObjectId().toString();
      const companyId = new ObjectId().toString();

      expect(
        await historyService.getOneOnOneHistory({
          channelId: buildChannelId(userId1, userId2),
          userId: userId1,
          companyId,
        }),
      ).toHaveLength(0);
    });
    it('Sending two messages should result in two history items', async () => {
      const client = withMockChatClient();
      const chatRepo = new UserChatRepository(client);
      const channelRepo = new ChannelRepository(client);
      const chatService = new UserChatService(chatRepo, channelRepo, withLogger());

      const historyRepo = new ChannelHistoryRepository(client);
      const historyService = new ChannelHistoryService(historyRepo, channelRepo, chatRepo);

      const userId1 = new ObjectId().toString();
      const userId2 = new ObjectId().toString();
      const companyId = new ObjectId().toString();

      await expect(
        chatService.sendMessage({
          channelId: buildChannelId(userId1, userId2),
          companyId,
          senderId: userId1,
          recipientId: userId2,
          type: ChatMessageType.Text,
          data: 'General Kenobi.',
        }),
      ).resolves.toBeDefined();
      await expect(
        chatService.sendMessage({
          channelId: buildChannelId(userId1, userId2),
          companyId,
          senderId: userId2,
          recipientId: userId1,
          type: ChatMessageType.Text,
          data: 'Hello there!',
        }),
      ).resolves.toBeDefined();

      const messages = await historyService.getOneOnOneHistory({
        channelId: buildChannelId(userId1, userId2),
        userId: userId1,
        companyId,
      });
      expect(messages).toHaveLength(2);
      expect(messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: 'Hello there!',
            user: expect.objectContaining({ user_id: userId2 }),
          }),
          expect.objectContaining({
            message: 'General Kenobi.',
            user: expect.objectContaining({ user_id: userId1 }),
          }),
        ]),
      );
    });
  });
});
