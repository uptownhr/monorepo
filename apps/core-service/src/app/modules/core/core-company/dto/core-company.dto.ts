//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreUserDTO } from '../../core-user/dto';
import type { CoreAddressDTO } from '../../dto/core-address.dto';
import type { CoreCompanyRoleDTO } from './core-company-role.dto';

export interface CoreCompanyDTO {
  readonly id: string;
  readonly name: string;
  readonly address: CoreAddressDTO;

  // The following are optional dependening on context
  _owner?: CoreUserDTO;
  _companyRoles?: CoreCompanyRoleDTO[];
}
