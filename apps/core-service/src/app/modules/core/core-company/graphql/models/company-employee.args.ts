//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ArgsType, Field } from '@nestjs/graphql';
import { CompanyV1EmploymentType } from '../../models';

@ArgsType()
export class FilterEmployeeArgs {
  @Field(() => CompanyV1EmploymentType, { nullable: true })
  employmentType?: CompanyV1EmploymentType;
}
