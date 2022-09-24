//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { registerEnumType } from '@nestjs/graphql';

export enum CompanyV1EmploymentType {
  W2 = 'w2',
  Contractor = '1099',
  All = 'all',
}

registerEnumType(CompanyV1EmploymentType, {
  name: 'CompanyV1EmploymentType',
  valuesMap: {
    Contractor: {
      description: 'A 1099 contractor',
    },
    W2: {
      description: 'A W2 employee',
    },
    All: {
      description: 'default behavior is all',
    },
  },
});
