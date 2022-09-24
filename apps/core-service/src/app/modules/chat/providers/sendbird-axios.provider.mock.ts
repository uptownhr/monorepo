//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { faker } from '@faker-js/faker';
import { getUnixTime } from 'date-fns';
import { createMock } from 'ts-auto-mock';
import type {
  SendbirdChannelResponse,
  SendbirdError,
  SendbirdTextMessageResponse,
  SendbirdUserResponse,
} from '../types/sendbird';
import type { SendbirdClient } from './sendbird-axios.provider';
/**
 * The purpose of this mock is to "fake" some of the behavior of
 * the sendbird API to the best of our knowledge.
 * @returns
 */
export function withMockChatClient() {
  const users = new Map<string, SendbirdUserResponse>();
  const channels = new Map<string, SendbirdChannelResponse>();
  const messages = new Map<string, SendbirdTextMessageResponse[]>();
  const threads = new Map<bigint, SendbirdTextMessageResponse[]>();

  const mockClient = createMock<SendbirdClient>({
    /**
     * Mock user enrollment
     * @param userId
     * @returns
     */
    enrollUser: jest.fn().mockImplementation(async (userId: string) => {
      if (users.has(userId)) {
        return createMock<SendbirdError>({
          code: 400202,
          message: '"User" already exists',
        });
      }
      const user = createMock<SendbirdUserResponse>({
        user_id: userId,
      });
      users.set(userId, user);
      return user;
    }),

    getUserChannels: jest.fn().mockImplementation(async (userId, members, token) => {
      return {
        channels: Array.from(channels.values()).filter((channel) =>
          channel.members.some((m) => members.concat(userId).includes(m.user_id)),
        ),
        token: null,
      };
    }),
    /**
     * Mock Channel Creation
     * @param channelId
     * @param companyId
     * @param userIds
     * @returns
     */
    createChannel: jest.fn().mockImplementation(async (channelId, companyId, userIds) => {
      if (channels.has(channelId)) {
        return createMock<SendbirdError>({
          code: 400202,
          message: '"Channel" already exists',
        });
      }
      if (userIds.some((id) => !users.has(id))) {
        return createMock<SendbirdError>({
          code: 400201,
          message: '"User" not found.',
        });
      }

      const channel = createMock<SendbirdChannelResponse>({
        channel_url: channelId,
        members: userIds.map((u) => users.get(u)!),
      });
      channels.set(channelId, channel);
      return channel;
    }),

    /**
     * Mock assing user to channel
     * @param channelId
     * @param userId
     * @returns
     */
    addUserToChannel: jest.fn().mockImplementation(async (channelId, userId) => {
      if (!channels.has(channelId)) {
        return createMock<SendbirdError>({
          code: 400201,
          message: '"Channel" not found.',
        });
      }

      if (!users.has(userId)) {
        return createMock<SendbirdError>({
          code: 400201,
          message: '"User" not found.',
        });
      }

      const channel = channels.get(channelId)!;

      channel.members.push(createMock<SendbirdUserResponse>({ user_id: userId }));
    }),

    /**
     * Mock sending a message
     * @param channelId
     * @param userId
     * @param type
     * @param data
     * @param message
     */
    sendCustomMessage: jest.fn().mockImplementation(async (channelId, userId, type, data?, message?) => {
      if (!channels.has(channelId)) {
        return createMock<SendbirdError>({
          code: 400201,
          message: '"Channel" not found.',
        });
      }

      if (!users.has(userId)) {
        return createMock<SendbirdError>({
          code: 400201,
          message: '"User" not found.',
        });
      }

      const channel = channels.get(channelId)!;
      if (!channel.members.find((m) => m.user_id === userId)) {
        return createMock<SendbirdError>({
          code: 400108,
          message: '"User" not in channel.',
        });
      }

      const chatMessage = createMock<SendbirdTextMessageResponse>({
        message_id: faker.datatype.bigInt(),
        channel_url: channelId,
        created_at: getUnixTime(new Date()),
        type: 'MESG',
        custom_type: type,
        message,
        data,
        user: users.get(userId),
      });

      if (!messages.has(channelId)) {
        messages.set(channelId, [chatMessage]);
      } else {
        messages.get(channelId)?.unshift(chatMessage);
      }

      return chatMessage;
    }),

    sendCustomMessageToThread: jest
      .fn()
      .mockImplementation(async (channelId, parentId, userId, type, data?, message?) => {
        if (!channels.has(channelId)) {
          return createMock<SendbirdError>({
            code: 400201,
            message: '"Channel" not found.',
          });
        }

        if (!users.has(userId)) {
          return createMock<SendbirdError>({
            code: 400201,
            message: '"User" not found.',
          });
        }

        const channel = channels.get(channelId)!;
        if (!channel.members.find((m) => m.user_id === userId)) {
          return createMock<SendbirdError>({
            code: 400108,
            message: '"User" not in channel.',
          });
        }

        // find message
        const channelMessages = messages.get(channelId)!;
        const parentMessage = channelMessages.find((m) => m.message_id === parentId);
        if (!parentMessage) {
          return createMock<SendbirdError>({
            code: 400201,
            message: '"Message" not found.',
          });
        }

        const threadMessage = createMock<SendbirdTextMessageResponse>({
          message_id: faker.datatype.bigInt(),
          channel_url: channelId,
          created_at: getUnixTime(new Date()),
          type: 'MESG',
          custom_type: type,
          message,
          data,
          user: users.get(userId),
          parent_message_id: parentMessage.message_id.toString(),
          parent_message_info: parentMessage,
        });

        if (!threads.has(parentMessage.message_id)) {
          threads.set(parentMessage.message_id, [threadMessage]);
        } else {
          threads.get(parentMessage.message_id)?.unshift(threadMessage);
        }

        parentMessage.thread_info = {
          updated_at: threadMessage.created_at,
          last_replied_at: threadMessage.created_at,
          reply_count: threads.get(parentMessage.message_id)!.length,
          most_replies: [],
        };
      }),
    getChannelHistory: jest
      .fn()
      .mockImplementation(
        async (
          channelId,
          afterId,
          count = 15,
        ): Promise<SendbirdError | { messages: SendbirdTextMessageResponse[] }> => {
          if (!channels.has(channelId)) {
            return createMock<SendbirdError>({
              code: 400201,
              message: '"Channel" not found.',
            });
          }

          if (!messages.has(channelId)) {
            return { messages: [] };
          }

          const messageList = messages.get(channelId)!;
          if (afterId) {
            const index = messageList.findIndex((m) => m.message_id === afterId);
            if (index) {
              return { messages: messageList.slice(index + 1, index + 1 + count) };
            }
          }
          return { messages: messageList.slice(0, count) };
        },
      ),
    getThreadHistory: jest
      .fn()
      .mockImplementation(
        async (
          channelId,
          parentId,
          afterId,
          count = 15,
        ): Promise<SendbirdError | { messages: SendbirdTextMessageResponse[] }> => {
          if (!channels.has(channelId)) {
            return createMock<SendbirdError>({
              code: 400201,
              message: '"Channel" not found.',
            });
          }

          const firstMessage = messages.get(channelId)!.find((m) => m.message_id === parentId);
          if (!firstMessage) {
            return createMock<SendbirdError>({
              code: 400201,
              message: '"Message" not found.',
            });
          }

          if (!threads.has(parentId)) {
            return { messages: [firstMessage] };
          }

          const messageList = threads.get(parentId)!;
          let returnList;
          if (afterId) {
            const index = messageList.findIndex((m) => m.message_id === afterId);
            if (index) {
              returnList = { messages: messageList.slice(index + 1, index + 1 + count) };
            }
          } else {
            returnList = { messages: messageList.slice(0, count) };
          }
          if (returnList.messages.length !== count) {
            returnList.messages.push(firstMessage);
          }

          return returnList;
        },
      ),
  });

  return mockClient;
}
