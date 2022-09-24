//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ConsumableTokenDocument = ConsumableToken & mongoose.Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  minimize: false,
})
export class ConsumableToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'Auth' */ })
  _user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId /* ref: 'Auth' */ })
  _created_by: mongoose.Schema.Types.ObjectId;

  @Prop()
  token: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: null })
  expires_at: Date;

  @Prop({ default: null })
  consumed_at: Date;
}

export const ConsumableTokenSchema = SchemaFactory.createForClass(ConsumableToken);
