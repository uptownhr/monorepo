//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop } from '@nestjs/mongoose';

export class OauthIdentityTokens {
  @Prop()
  token_type: string;

  @Prop()
  id_token: string;

  @Prop()
  access_token: string;

  @Prop()
  refresh_token: string;

  @Prop()
  expiry_date: Date;
}

export class OauthIdentityProfile {
  @Prop({ required: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  avatar_url: string;

  @Prop()
  email: string;
}

export class OauthIdentitySchema {
  @Prop()
  kind: string;

  @Prop()
  tokens: OauthIdentityTokens;

  @Prop()
  profile: OauthIdentityProfile;
}
