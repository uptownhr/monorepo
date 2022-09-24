//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
// from: https://sendbird.com/docs/chat/v3/platform-api/message/messaging-basics/list-messages
export interface SendbirdChannelMessagesRequest {
  // required
  channel_type: 'open_channels' | 'group_channels';
  channel_url: string;

  message_ts?: bigint; // set this to search after timestamp
  message_id?: bigint; // set this to search after message Id

  // for threads
  parent_message_id?: bigint;

  // optional
  prev_limit?: number;
  next_limit?: number; // default is 15, acceptible 0-200
  include?: boolean;
  reverse?: boolean;

  sender_id?: string; // limit to userId
  sender_ids?: string[];
  operator_filter?: 'all' | 'operator' | 'nonoperator';
  message_type?: 'MESG' | 'FILE' | 'ADMM';
  custom_types?: string[];
  including_removed?: boolean;
  include_reactions?: boolean;
  with_sorted_meta_array?: boolean;
  show_subchannel_messages_only?: boolean;
  user_id?: string;

  // thread related
  include_reply_type?: 'NONE' | 'ALL' | 'ONLY_REPLY_TO_CHANNEL';
  include_thread_info?: boolean;
  include_parent_message_info?: boolean;
}
