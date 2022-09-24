//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { CoreUserRepository } from '../repositories/core-user.repository';

@Injectable()
export class CoreUserService {
  constructor(private coreRepo: CoreUserRepository) {}
  async getCompanyUsers(companyId: string) {
    return this.coreRepo.getCompanyUsers(companyId);
  }

  async getUsers(userIds: string[]) {
    return this.coreRepo.getUsersById(userIds);
  }
}
