//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ObjectId } from 'bson';
import { withLogger } from '../../../__tests__/test-helper';
import { buildChannelId } from '../lib/build-channel-id';
import { withMockChatClient } from '../providers/sendbird-axios.provider.mock';
import { ChannelRepository, UserChatRepository } from '../repositories';
import { ChatMessageType } from '../types/ChatMessageType';
import { UserChatService } from './user-chat.service';

describe('User Chat Service', () => {
  describe('Sending a one-on-one message', () => {
    it('Should automatically create the sender and channels', async () => {
      const client = withMockChatClient();
      const chatRepo = new UserChatRepository(client);
      const channelRepo = new ChannelRepository(client);
      const chatService = new UserChatService(chatRepo, channelRepo, withLogger());

      const userId1 = new ObjectId().toString();
      const userId2 = new ObjectId().toString();

      await expect(
        chatService.sendMessage({
          channelId: buildChannelId(userId1, userId2),
          companyId: new ObjectId().toString(),
          senderId: userId1,
          recipientId: userId2,
          type: ChatMessageType.Text,
          data: 'Hello there!',
        }),
      ).resolves.toBeDefined();
      expect(client.enrollUser).toBeCalledTimes(1);
      expect(client.createChannel).toBeCalledTimes(2); // called once, errors, called again
      expect(client.sendCustomMessage).toBeCalledTimes(2); // called once, errors, called again
    });
  });
});
