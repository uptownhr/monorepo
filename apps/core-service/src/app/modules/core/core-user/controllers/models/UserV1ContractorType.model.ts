//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { registerEnumType } from '@nestjs/graphql';

export enum UserV1ContractorType {
  Business = 'business',
  Individual = 'individual',
  Blank = '',
}

registerEnumType(UserV1ContractorType, {
  name: 'UserV1ContractorType',
});

export type UserV1ContractorTypeValues = `${UserV1ContractorType}`;
