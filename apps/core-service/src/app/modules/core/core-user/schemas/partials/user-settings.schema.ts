//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false,
})
export class UserSettings {
  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'GoogleWatchChannel' */ })
  calendar_channel: mongoose.Schema.Types.ObjectId;

  @Prop({ default: null })
  zendesk_org_membership_id?: number;

  @Prop({ default: null })
  zendesk_user_id?: number;

  @Prop({ default: null })
  zendesk_email?: string;

  @Prop({ default: null })
  intercomUserId?: number;

  @Prop({ default: '' })
  intercomEmail: string;

  @Prop({ default: '' })
  hrEmailAlias: string;

  @Prop({ default: '' })
  slackUserId: string;

  @Prop({ default: '' })
  salesforceUserId: string;

  @Prop({ default: null })
  salesforceContactId?: string;

  @Prop({ default: '' })
  vonageExtension: string;

  @Prop({ default: '' })
  vonageNumber: string;

  @Prop({ default: '' })
  calendlySlug: string;

  @Prop({ default: null })
  pandaContactId?: string;
}
