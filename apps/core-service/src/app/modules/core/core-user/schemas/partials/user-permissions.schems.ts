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
export class UserPermissions {
  @Prop({ default: false })
  manager: boolean;
  @Prop({ default: false })
  approver: boolean;
  @Prop({ default: false })
  canCancelAccount: boolean;
  @Prop({ default: false })
  canRetractSignedPolicies: boolean;
  @Prop({ default: false })
  canEditGlobalPolicies: boolean;
  @Prop({ default: false })
  canViewPayrollTab: boolean;
}
