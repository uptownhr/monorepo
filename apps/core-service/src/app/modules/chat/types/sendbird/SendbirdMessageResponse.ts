//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { SendbirdSortedMetadata } from './SendbirdMetadata';
import type { SendbirdUserResponse } from './SendbirdUserResponse';

/* eslint-disable @typescript-eslint/naming-convention */
export interface SendbirdTextMessageResponse {
  message_id: bigint;
  type: 'MESG' | 'FILE' | 'ADMIN';
  custom_type: string;
  channel_url: string;
  user: SendbirdUserResponse;
  is_removed: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
  data: string;
  sorted_metadata: SendbirdSortedMetadata[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  og_tags: any;
  created_at: number;
  updated_at: number;

  is_apple_critical_alert: boolean;
  // replace this later
  thread_info?: {
    reply_count: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    most_replies: any[];
    last_replied_at: number;
    updated_at: number;
  };

  parent_message_id?: string;
  parent_message_info?: SendbirdTextMessageResponse;
  is_reply_to_channel: boolean;
}

export interface SendbirdFileMessageResponse extends SendbirdTextMessageResponse {
  type: 'FILE';
  file: {
    url: string;
    name: string;
    type: string;
    size: number;
    data: string;
  };
  thumbnails: string[];
  require_auth: boolean;
}
