//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PartnerUserDocument = PartnerUser & mongoose.Document;

@Schema()
class PartnerUserProfileSchema {
  @Prop({ trim: true, default: '' })
  first_name: string;

  @Prop({ trim: true, default: '' })
  last_name: string;

  @Prop({ trim: true })
  phone: string;

  @Prop({ trim: true })
  email: string;
}

@Schema()
class PartnerUserStatesSchema {
  @Prop({ default: false })
  demo_account_created: boolean;

  @Prop({ default: true })
  active: boolean;
}

@Schema()
class PartnerUserTokenSchema {
  @Prop({ default: false })
  active: boolean;

  @Prop({ default: '' })
  text: string;

  @Prop({ default: Date.now })
  generated_at: Date;
}

@Schema()
export class PartnerUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId, /* ref: 'Company', */ default: null })
  _company: mongoose.Schema.Types.ObjectId;

  @Prop({ lowercase: true, trim: true })
  email: string;

  @Prop({ default: '' })
  partner_code: string;

  @Prop({ enum: ['', 'partner', 'ambassador'], default: '' })
  partner_type: '' | 'partner' | 'ambassador';

  @Prop({ type: PartnerUserProfileSchema, default: {} })
  profile: PartnerUserProfileSchema;

  @Prop({ type: PartnerUserStatesSchema, default: {} })
  states: PartnerUserStatesSchema;

  @Prop({ trim: true, select: false })
  password: string;

  @Prop({ type: PartnerUserTokenSchema, default: {} })
  token: PartnerUserTokenSchema;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const PartnerUserSchema = SchemaFactory.createForClass(PartnerUser);
