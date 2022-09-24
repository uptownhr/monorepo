//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserV1ContractorType } from './UserV1ContractorType.model';

export class UpdateUserProfileV1Body {
  @ApiPropertyOptional({
    enum: Object.values(UserV1ContractorType),
  })
  contractorType?: UserV1ContractorType;

  @ApiPropertyOptional()
  contractorBusinessName?: string;

  constructor(data?: UpdateUserProfileV1Body) {
    Object.assign(this, data);
  }
}
