//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { Injectable } from '@nestjs/common';
import * as HttpErrors from 'http-errors';
import type { CompanyV1ProfileResponseBody } from '../models';
import { CompanyV1ProfileRepository } from '../repositories/company-v1-profile.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyV1ProfileRepo: CompanyV1ProfileRepository) {}

  async getCompany(currentUser: CurrentUser, companyId: string): Promise<CompanyV1ProfileResponseBody> {
    const companyV1Profile = await this.companyV1ProfileRepo.getProfile(companyId);

    if (!companyV1Profile) {
      throw new HttpErrors.NotFound('Company not found');
    }

    return companyV1Profile;
  }
}
