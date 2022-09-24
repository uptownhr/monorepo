//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
export interface SendbirdCreateUserRequest {
  user_id: string;
  nickname: string;
  profile_url: string;

  // optional
  // profile_file?: File;
  issue_access_token: boolean; // should be truthy
}
