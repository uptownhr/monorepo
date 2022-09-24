//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreAuthDTO } from '../../core-auth/dto';
import type { CoreCompanyDTO } from '../../core-company/dto/core-company.dto';
import type { CoreUserEmploymentDTO } from './core-user-employment.dto';
import type { CoreUserPermissionsDTO } from './core-user-permissions.dto';
import type { CoreUserProfileDTO } from './core-user-profile.dto';
import type { CoreUserSettingsDTO } from './core-user-settings.dto';
import type { CoreUserStatesDTO } from './core-user-states.dto';

export class CoreUserDTO {
  readonly id: string;
  readonly companyId?: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly roles: string[];
  readonly primaryRole: string;
  readonly timeZone: string;
  readonly profile: CoreUserProfileDTO;
  readonly employment: CoreUserEmploymentDTO;
  readonly settings: CoreUserSettingsDTO;
  readonly states: CoreUserStatesDTO;
  readonly permissions: CoreUserPermissionsDTO;

  //partials that may or may not be available depending on context
  readonly _auth?: CoreAuthDTO;
  readonly _company?: CoreCompanyDTO;
}
