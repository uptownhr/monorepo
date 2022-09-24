//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false,
})
export class EmergencySchema {
  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  relationship: string;

  @Prop({ default: '' })
  email: string;
}
