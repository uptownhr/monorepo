//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
export interface SendbirdUserResponse {
  user_id: string;
  nickname: string;
  profile_url: string;
  access_token: string;
  has_ever_logger_in: boolean;
  is_active: boolean;
  is_online: boolean;
  discovery_keys: string[];
  preferred_langauges: string[];
  created_at: number;
  last_seen_at: number;
  metadata: Array<Record<string, string | number | boolean | null>>;
}
