//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EmergencySchema } from './user-profile-emergency-contact.schema';

export enum UserProfileType {
  DEFAULT = '',
  HOURLY = 'hourly',
  SALARY = 'salary',
  CONTRACTOR = 'contractor',
}

export enum UserProfileEmployeeType {
  DEFAULT = '',
  PARTTIME = 'parttime',
  FULLTIME = 'fulltime',
  CONTRACTOR = 'contractor',
}

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false,
})
export class UserProfileSchema {
  @Prop({ trim: true, default: '' })
  first_name: string;

  @Prop({ trim: true, default: '' })
  last_name: string;

  @Prop({ trim: true, index: true })
  role: string;

  @Prop({ trim: true })
  supervisor: string;

  // TODO implement setter
  @Prop({ default: '', trim: true })
  phone: string;

  @Prop({ enum: Object.values(UserProfileType), default: UserProfileType.DEFAULT })
  type: UserProfileType;

  @Prop({ enum: Object.values(UserProfileEmployeeType), default: UserProfileEmployeeType.DEFAULT })
  employee_type: UserProfileEmployeeType;

  // TODO implement setter
  @Prop({ trim: true })
  pay_rate: string;

  @Prop({ default: '' })
  pay_day: string;

  @Prop({ default: '' })
  pay_frequency: string;

  @Prop({ trim: true })
  hours_per_week: string;

  @Prop({ trim: true })
  start_date: string;

  @Prop({ trim: true })
  address: string;

  @Prop({ trim: true })
  address2: string;

  @Prop({ trim: true })
  city: string;

  @Prop({ trim: true })
  state: string;

  @Prop({ trim: true })
  zip: string;

  @Prop({ trim: true })
  state_work_in: string;

  @Prop({ type: Date, default: null })
  dob: Date;

  @Prop({ default: '' })
  lastSocial: string;

  @Prop({ default: '' })
  avatar_url: string;

  @Prop({ default: '' })
  years_experience: string;

  @Prop({ default: false })
  contractor: boolean;

  // no longer in use?
  @Prop({ type: mongoose.Schema.Types.ObjectId, /* ref: 'PartnerUser', */ default: null })
  _partner?: mongoose.Schema.Types.ObjectId;

  @Prop({ default: '' })
  conference: string;

  @Prop({ type: EmergencySchema, default: {} })
  emergency_contact: EmergencySchema;

  @Prop({ default: '' })
  timezone: '';

  @Prop({ default: null })
  contractor_business_name?: string;

  @Prop({ enum: ['individual', 'business', ''], default: '' })
  contractor_type: 'individual' | 'business' | '';

  @Prop({ enum: ['exempt', 'non-exempt', ''], default: '' })
  classification: 'exempt' | 'non-exempt' | '';
}
