//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import type { SendbirdTextMessageResponse } from './SendbirdMessageResponse';
import type { SendbirdUserResponse } from './SendbirdUserResponse';

export interface SendbirdChannelResponse {
  name: string;
  channel_url: string;
  cover_url: string;
  custom_type: string;
  data: string;
  is_distinct: boolean;
  is_super: boolean;
  is_ephemeral: boolean;
  is_access_code_required: boolean;
  member_count: number;
  joined_member_count: number;
  members: SendbirdUserResponse[];
  operators: SendbirdUserResponse[];
  read_receipt: any; // TODO
  max_length_message: number;
  unread_message_count: number;
  unread_mention_count: number;
  last_message: SendbirdTextMessageResponse;
  created_by: any;
  created_at: number;
  freeze: boolean;
}
