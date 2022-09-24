//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import { nullIfEmptyString } from '../../../../../lib/null-if-empty-string';
import type { DeepPartial } from '../../../../../types/DeepPartial';
import { CoreUser } from '../../../core-user/graphql/models/user.model';
//import { CoreUser } from '../../../core-user/graphql/models/user.model';
import { CoreAddress } from '../../../graphql/models/address.model';
import type { CoreCompanyDTO } from '../../dto/core-company.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class CoreCompany {
  @Field(() => GraphQLID)
  id: string;

  @Field()
  name: string;

  @Field(() => CoreAddress)
  address: CoreAddress;

  @Field(() => CoreUser)
  owner?: DeepPartial<CoreUser>;
  /*
  this is a field resolver
  @Field(() => [CoreUser])
  employees: CoreUser[];
  */
}

export function mapCoreCompanyDtoToModel(dto: CoreCompanyDTO): CoreCompany {
  const res: CoreCompany = {
    id: dto.id,
    name: dto.name,
    address: {
      line1: nullIfEmptyString(dto.address?.line1),
      line2: nullIfEmptyString(dto.address?.line2),
      city: nullIfEmptyString(dto.address?.city),
      state: nullIfEmptyString(dto.address?.state),
      zipCode: nullIfEmptyString(dto.address?.zipCode),
    },
  };

  /**
   * If requested, the owner will already be cached in dataloader, and
   * the CoreUser resolver will fill the rest of this in.
   */
  if (dto._owner) {
    res.owner = {
      id: dto._owner.id,
    };
  }
  return res;
}
