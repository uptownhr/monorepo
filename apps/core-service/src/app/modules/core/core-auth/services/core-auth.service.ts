//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { CoreAuthByIdLoader } from '../dataloaders/core-auth-by-id.loader';
import type { CoreAuthDTO } from '../dto';

@Injectable()
export class CoreAuthService {
  constructor(protected coreAuthLoader: CoreAuthByIdLoader) {}

  async getAuth(authId: string): Promise<CoreAuthDTO | null> {
    return this.coreAuthLoader.load(authId);
  }
}
