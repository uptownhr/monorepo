//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type mongoose from 'mongoose';

export type SsoClientConfigurationDocument = SsoClientConfiguration & mongoose.Document;

@Schema()
export class SsoClientConfiguration {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  clientSecret: string;

  @Prop({ required: true })
  privateKey: string;

  @Prop({ required: true })
  publicKey: string;
}

export const SsoClientConfigurationSchema = SchemaFactory.createForClass(SsoClientConfiguration);
