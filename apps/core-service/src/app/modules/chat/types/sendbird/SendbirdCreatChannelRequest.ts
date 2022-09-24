//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
export interface SendbirdCreateChannelRequest {
  // required
  // users: any[]; // only using IDs for now
  user_ids: string[];

  // Optional but not really
  name: string;
  channel_url: string;
  cover_url: string;
  // cover_file: File;

  // optional
  custom_type?: string;
  is_distinct?: boolean;
  is_public: false; // should be false
  is_super: false; //should be false
  is_ephemeral: false;
  access_code?: string;
  inviter_id?: string;
  strict: false;
  invitation_status?: any;
  hidden_status?: any;
  operator_ids?: string[];
  block_sdk_user_channel_join: true;
}
