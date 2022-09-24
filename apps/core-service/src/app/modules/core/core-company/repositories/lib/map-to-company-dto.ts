//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreCompanyDTO } from '../../dto/core-company.dto';
import type { CompanyDocument } from '../../schemas/core-company.schema';

export function mapCompanyDocToCompanyDto(company: CompanyDocument): CoreCompanyDTO {
  const res: CoreCompanyDTO = {
    id: company._id.toString(),
    name: company.name,
    address: {
      line1: company.profile.address,
      line2: company.profile.address2,
      city: company.profile.city,
      state: company.profile.state,
      zipCode: company.profile.zip,
    },
  };

  return res;
}
