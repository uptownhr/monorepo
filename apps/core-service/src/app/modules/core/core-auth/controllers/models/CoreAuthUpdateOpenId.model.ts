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

import { ApiProperty } from '@nestjs/swagger';
import type { UserinfoResponse } from 'openid-client';

class TokenSet {
  access_token?: string;
  token_type?: string;
  id_token?: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  session_state?: string;
  scope?: string;
}

export class CoreAuthUpdateOpenIdBody {
  @ApiProperty({
    type: String,
    required: false,
  })
  provider?: string;

  @ApiProperty({
    type: () => TokenSet,
    required: false,
  })
  tokens?: TokenSet;

  @ApiProperty({
    required: false,
  })
  userInfo?: UserinfoResponse;

  constructor(data?: CoreAuthUpdateOpenIdBody) {
    Object.assign(this, data);
  }
}
