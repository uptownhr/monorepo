//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { SendbirdSortedMetadata } from './SendbirdMetadata';

/* eslint-disable @typescript-eslint/naming-convention */
export interface SendbirdFileMessageRequest {
  // Required
  message_type: 'file';
  user_id: string;

  // One of the following is required
  file?: string;
  url?: string;

  // optional
  file_name?: string;
  file_size?: string;
  file_type?: string;
  thumbnails?: string[];
  custom_type?: string;
  data?: string;
  require_auth?: boolean;
  send_push?: boolean;
  mention_type?: 'users' | 'channels';
  mentioned_user_ids?: string[];
  is_silent?: boolean;
  mark_as_read?: boolean;
  sorted_metaarray?: SendbirdSortedMetadata[];
  created_at?: number;
  dedup_id?: string;
  apns_bundle_id?: string;
  // apple_critical_alert_options?: any; // don't ever use this
  sound?: string;
  volume?: number; // 0 - 1
}
