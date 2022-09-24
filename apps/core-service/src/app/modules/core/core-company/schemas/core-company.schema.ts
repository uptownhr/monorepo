//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

function setPhone(v) {
  return v ? v.replace(/[\s()-]/gi, '') : '';
}

export type CompanyDocument = Company & mongoose.Document;

export class CompanyProfileSchema {
  @Prop({ trim: true, default: '' })
  address: string;

  @Prop({ trim: true, default: '' })
  address2: string;

  @Prop({ trim: true, default: '' })
  city: string;

  @Prop({ trim: true, default: '' })
  zip: string;

  @Prop({ trim: true, default: '' })
  state: string;

  @Prop({ trim: true, default: '' })
  dba: string;

  @Prop({ default: '', trim: true, set: setPhone })
  phone: string;

  @Prop({ default: 'Bi-weekly' })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  pay_frequency: string;

  @Prop({ default: 'Friday' })
  payday: string;

  @Prop({ default: '' })
  fein: string;

  @Prop({ default: '' })
  industry: string;

  @Prop({ default: '' })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  logo_url: string;
}

@Schema()
export class Company {
  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'User' */ })
  _owner: mongoose.Schema.Types.ObjectId;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ type: CompanyProfileSchema })
  profile: CompanyProfileSchema;

  @Prop({ default: null })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  converted_at: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
