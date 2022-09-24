//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { UserGroupDTO } from '../../../dto/UserGroup.dto';
import type { CoreUserGroup } from '../../models/CoreUserGroup.model';
import { mapRecipients } from './mapRecipients';
import { mapType } from './mapType';

export function mapResult(dto: UserGroupDTO[]): CoreUserGroup[] {
  return dto.map((group) => ({
    id: group.id,
    name: group.name,
    type: mapType(group.type),
    members: mapRecipients(group.members),
  }));
}
