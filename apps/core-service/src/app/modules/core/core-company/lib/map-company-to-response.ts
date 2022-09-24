//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { AuthDocument } from '../../core-auth/schemas/core-auth.schema';
import type { UserDocument } from '../../core-user/schemas/user.schema';
import { CompanyV1AddressResponseBody, CompanyV1ProfileResponseBody } from '../models';
import type { CompanyDocument } from '../schemas/core-company.schema';

export function mapCompanyToResponse({
  company,
  owner,
  ownerAuth,
}: {
  company: CompanyDocument;
  owner: UserDocument;
  ownerAuth: AuthDocument;
}): CompanyV1ProfileResponseBody {
  const { name, profile, converted_at: convertedAt } = company;
  const {
    address: address1,
    address2,
    city,
    state,
    zip,
    dba,
    phone,
    pay_frequency: payFrequency,
    payday: payDay,
    fein,
    industry,
    logo_url: logoUrl,
  } = profile;
  const { email } = ownerAuth;

  const address = new CompanyV1AddressResponseBody({
    address1,
    address2,
    city,
    state,
    zipCode: zip,
  });

  return new CompanyV1ProfileResponseBody({
    address,
    name,
    dba,
    email,
    phone,
    ein: fein,
    industry,
    logoUrl,
    payFrequency,
    payDay,
    id: company._id.toString(),
    ownerId: owner?._id.toString(),
    convertedAt: convertedAt?.toISOString(),
  });
}
