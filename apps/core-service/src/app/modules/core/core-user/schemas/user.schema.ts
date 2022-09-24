//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { UserRole } from '@bambeehr/consts';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserPermissions, UserProfileSchema, UserSettings, UserStates } from './partials';

export type UserDocument = User & mongoose.Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  minimize: false,
})
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'Auth' */ })
  _auth: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'Company' */ })
  _company?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'User' */ })
  _manager: mongoose.Types.ObjectId;

  @Prop({ default: 0 })
  directReportCount: number;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.User,
  })
  role: UserRole;

  @Prop({ type: UserProfileSchema, default: {} })
  profile: UserProfileSchema;

  @Prop({ type: UserPermissions, default: {} })
  permissions: UserPermissions;

  @Prop({ type: UserStates, default: {} })
  states: UserStates;

  @Prop({ type: UserSettings, default: {} })
  settings: UserSettings;

  @Prop({ default: false })
  onboarding_cohort: boolean;

  @Prop({ default: null })
  first_login_at?: Date;

  @Prop({ default: null })
  profile_completed_at?: Date;

  @Prop({ default: null })
  all_onboarding_documents_signed_at?: Date;

  @Prop({ default: null })
  onboarded_at: Date;

  //marking deleted users
  @Prop({ default: true, required: true })
  active: boolean;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
