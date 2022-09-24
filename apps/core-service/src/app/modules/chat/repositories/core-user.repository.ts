//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InternalCompanyV1Controller } from '../../core/core-company/controllers';
import { InternalUserV1Controller } from '../../core/core-user/controllers';

@Injectable()
export class CoreUserRepository {
  constructor(
    private companyController: InternalCompanyV1Controller,
    private userController: InternalUserV1Controller,
  ) {}

  async getCompanyUsers(companyId: string) {
    return this.companyController.getEmployees(companyId);
  }

  async getUsersById(userIds: string[]) {
    return this.userController.getUsers({ userIds: userIds });
  }
}
