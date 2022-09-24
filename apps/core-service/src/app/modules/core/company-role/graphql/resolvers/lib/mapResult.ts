// //=============================================================================
// //Licensed Materials - Property of Bambee
// //(C) Copyright Bambee 2022
// //All Rights Reserved
// //=============================================================================

import type { CompanyRoleDTO } from '../../../dto/CompanyRole.dto';
import type { CompanyRole } from '../../models/CompanyRole.model';

export function mapCompanyRoleResult(dto: CompanyRoleDTO[]): CompanyRole[] {
  return dto.map((companyRole) => ({
    id: companyRole.id,
    title: companyRole.title,
    deletedAt: companyRole.deletedAt ?? undefined,
    createdAt: companyRole.createdAt,
    companyId: companyRole.companyId,
  }));
}
