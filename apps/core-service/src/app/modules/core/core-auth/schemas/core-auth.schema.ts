//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ActivationStatus } from '../types';
import { OauthIdentitySchema } from './core-oauth-identity.schema';

export type AuthDocument = Auth & mongoose.Document;

@Schema()
export class Auth {
  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'User' */ })
  _user: mongoose.Schema.Types.ObjectId;

  @Prop({ trim: true, required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ trim: true, index: true, lowercase: true })
  email: string;

  @Prop({ trim: true, select: false })
  password?: string;

  @Prop({ type: OauthIdentitySchema })
  oauth_identities?: OauthIdentitySchema[];

  @Prop()
  TOSAccepted?: boolean;

  @Prop({ default: null })
  tosAcceptedAt?: Date;

  @Prop({ default: true, required: true })
  active?: boolean;

  @Prop({ enum: Object.values(ActivationStatus), type: String })
  activation_status?: ActivationStatus;

  @Prop({ default: null })
  leadToken?: string;

  @Prop({ default: null })
  password_reset_token?: string;

  @Prop({ default: () => new Date() })
  created_at?: Date;

  @Prop({ default: '' })
  pandaContactId?: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
