//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

/* eslint-disable @typescript-eslint/naming-convention */
import type { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ChatChannelType } from '../types/ChatChannelType';
import type { ChatMessageType } from '../types/ChatMessageType';
import type {
  SendbirdChannelMessagesRequest,
  SendbirdChannelResponse,
  SendbirdCreateChannelRequest,
  SendbirdCreateUserRequest,
  SendbirdError,
  SendbirdFileMessageResponse,
  SendbirdMetadata,
  SendbirdTextMessageRequest,
  SendbirdTextMessageResponse,
  SendbirdUserResponse,
} from '../types/sendbird';
import type { SendbirdListMyGroupChannelsRequest } from '../types/sendbird/SendbirdListMyGroupChannelsRequest';
import type { SendbirdListMyGroupChannelsResponse } from '../types/sendbird/SendbirdListMyGroupChannelsResponse';
import { withMockChatClient } from './sendbird-axios.provider.mock';

/**
 * A typed wrapper around AXIOS to communicate with Sendbird
 */
export class SendbirdClient {
  #client: AxiosInstance;
  constructor(appId: string, apiKey: string) {
    if (process.env.NODE_ENV === 'test') {
      throw new Error('SendbirdClient must never be used in tests');
    }
    this.#client = axios.create({
      baseURL: `https://api-${appId!}.sendbird.com/v3`,
      headers: {
        'Content-Type': 'application/json; charset=utf8',
        'Api-Token': apiKey!,
      },
      validateStatus(status) {
        return true;
      },
    });
  }

  /**
   * A generic typed request method
   * @param method
   * @param url
   * @param data
   * @param query
   * @returns
   */
  async #request<Req, Query, Res>(
    method: string,
    url: string,
    data?: Req,
    params?: Query,
  ): Promise<Res | SendbirdError> {
    const res = await this.#client.request<Req, AxiosResponse<Res | SendbirdError>>({
      method,
      url,
      data,
      params,
    });

    if (res.status >= 400) {
      return res.data as SendbirdError;
    }

    return res.data;
  }

  /**
   * Channels
   */
  async getChannelHistory(channelId: string, afterId?: bigint, count = 15) {
    const req: SendbirdChannelMessagesRequest = {
      channel_type: 'group_channels',
      channel_url: channelId,
      prev_limit: count,
      include_thread_info: true,
      reverse: true,
    };

    if (afterId) {
      req.message_id = afterId;
    } else {
      req.message_ts = BigInt(Date.now());
    }

    return this.#request<null, SendbirdChannelMessagesRequest, { messages: SendbirdTextMessageResponse[] }>(
      'get',
      `/group_channels/${channelId}/messages`,
      null,
      req,
    );
  }

  async getThreadHistory(channelId: string, parentId: bigint, afterId?: bigint, count = 15) {
    const req: SendbirdChannelMessagesRequest = {
      channel_type: 'group_channels',
      channel_url: channelId,
      prev_limit: count,
      reverse: true,
      parent_message_id: parentId,
      include_thread_info: true,
      include_reply_type: 'ALL',

      // For now, we do not want to include the parent message in chat history.  Most UIs for threads persist the message as a conversation header e.g. in feedback threads.
      // if we DO want to include it as a message, we'll have to figure out how to insert it properly.
      // include_parent_message_info: !!afterId, //
    };

    if (afterId) {
      req.message_id = afterId;
    } else {
      req.message_ts = BigInt(Date.now());
    }

    return this.#request<null, SendbirdChannelMessagesRequest, { messages: SendbirdTextMessageResponse[] }>(
      'get',
      `/group_channels/${channelId}/messages`,
      null,
      req,
    );
  }

  async getUserChannels(
    userId: string,
    members?: string[],
    token?: string,
  ): Promise<SendbirdListMyGroupChannelsResponse | SendbirdError> {
    return this.#request<null, SendbirdListMyGroupChannelsRequest, SendbirdListMyGroupChannelsResponse>(
      'get',
      `/users/${userId}/my_group_channels`,
      null,
      {
        members_include_in: members,
        token,
      },
    );
  }

  async getChannel(channelId: string): Promise<SendbirdChannelResponse | SendbirdError> {
    return this.#request<null, null, SendbirdChannelResponse>('get', `/group_channels/${channelId}`);
  }

  async createChannel(channelId: string, companyId: string, userIds: string[], channelType = ChatChannelType.OneOnOne) {
    const res = await this.#request<SendbirdCreateChannelRequest, null, SendbirdChannelResponse>(
      'post',
      `/group_channels`,
      {
        user_ids: userIds,
        channel_url: channelId,
        is_public: false,
        is_super: false,
        is_ephemeral: false,
        name: 'Channel',
        cover_url: '',
        block_sdk_user_channel_join: true,
        strict: false,
      },
    );
    if (!isSendbirdError(res)) {
      await this.#request<{ metadata: SendbirdMetadata }, null, null>('post', `/group_channels/${channelId}/metadata`, {
        metadata: { companyId, channelType },
      });
    }
    return res;
  }

  async getMessage(
    channelId: string,
    messageId: bigint,
  ): Promise<SendbirdTextMessageResponse | SendbirdFileMessageResponse | SendbirdError> {
    return this.#request('get', `/group_channels/${channelId}/messages/${messageId}`);
  }

  // Messages
  async sendCustomMessage(channelId: string, userId: string, type: ChatMessageType, data?: string, message = '') {
    return this.#request<SendbirdTextMessageRequest, null, SendbirdTextMessageResponse>(
      'post',
      `/group_channels/${channelId}/messages`,
      {
        message,
        data,
        message_type: 'MESG',
        custom_type: type,
        user_id: userId,
        // sorted_metaarray: [{ key: 'companyId', value: '' }],
      },
    );
  }

  async sendCustomMessageToThread(
    channelId: string,
    parentId: bigint,
    userId: string,
    type: ChatMessageType,
    data?: string,
    message = '',
  ) {
    return this.#request<SendbirdTextMessageRequest & { parent_message_id: string }, null, SendbirdTextMessageResponse>(
      'post',
      `/group_channels/${channelId}/messages`,
      {
        message,
        data,
        message_type: 'MESG',
        custom_type: type,
        user_id: userId,
        parent_message_id: parentId.toString(),
      },
    );
  }

  // users
  async getUser(userId: string) {
    return this.#request<null, null, SendbirdUserResponse>('get', `/users/${userId}`);
  }

  async enrollUser(userId: string) {
    return this.#request<SendbirdCreateUserRequest, SendbirdUserResponse, SendbirdUserResponse>('post', '/users', {
      issue_access_token: true,
      user_id: userId,
      nickname: userId,
      profile_url: '',
    });
  }

  async addUserToChannel(channelId: string, userId: string) {
    return this.#request('post', `/group_channels/${channelId}/invite`, {
      user_ids: [userId],
    });
  }
}

function sendbirdAxiosInstanceFactory(configService: ConfigService): SendbirdClient {
  if (process.env.NODE_ENV === 'test') {
    return withMockChatClient();
  }
  const appId = configService.get<string>('chat.sendbird.appId');
  const apiKey = configService.get<string>('chat.sendbird.apiKey');
  return new SendbirdClient(appId!, apiKey!);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSendbirdError(d: any): d is SendbirdError {
  return Object.prototype.hasOwnProperty.call(d, 'error') && d.error === true;
}

export const SendbirdAxiosProvider: Provider<SendbirdClient> = {
  provide: SendbirdClient,
  useFactory: sendbirdAxiosInstanceFactory,
  inject: [ConfigService],
};
