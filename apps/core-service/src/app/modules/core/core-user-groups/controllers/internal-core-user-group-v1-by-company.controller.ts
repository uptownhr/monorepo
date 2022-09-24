//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { TokenType } from '@bambeehr/authentication';
import { BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Controller, Get, Param, ParseEnumPipe, UseGuards } from '@nestjs/common';
import type { UserGroupDTO } from '../dto/UserGroup.dto';
import { CompanyUserGroupService } from '../services/company-user-group.service';
import { UserGroupType } from '../types/UserGroupType';
import type { CompanyUserGroupV1Response } from './models/CompanyUserGroupV1Response';

@Controller('/internal/user-groups/v1/by-company/:companyId')
@UseGuards(BambeeAuthGuard(TokenType.Service))
export class InternalCoreUserGroupV1Controller {
  constructor(private groupService: CompanyUserGroupService) {}

  @Get()
  public async getAllCompanyGroups(
    @Param('companyId') companyId: string,
    @Param('groupType', new ParseEnumPipe(UserGroupType)) groupType?: UserGroupType,
  ): Promise<Array<CompanyUserGroupV1Response>> {
    const res = await this.groupService.getAllGroupsForCompany(companyId);
    return res?.filter((r) => r.type === groupType).map(mapToResponse) ?? [];
  }

  @Get('/by-type/:groupType')
  public async getGroupsByType(
    @Param('companyId') companyId: string,
    @Param('groupType', new ParseEnumPipe(UserGroupType)) groupType?: UserGroupType,
  ): Promise<Array<CompanyUserGroupV1Response>> {
    const res = await this.groupService.getAllGroupsForCompany(companyId);
    return res?.filter((r) => r.type === groupType).map(mapToResponse) ?? [];
  }

  @Get('/by-owner/:ownerId')
  public async getGroupsByOwner(
    @Param('companyId') companyId: string,
    @Param('ownerId') ownerId: string,
    @Param('groupType', new ParseEnumPipe(UserGroupType)) groupType?: UserGroupType,
  ): Promise<Array<CompanyUserGroupV1Response>> {
    const res = await this.groupService.getAllGroupsForOwner(ownerId);
    return res?.filter((r) => r.type === groupType).map(mapToResponse) ?? [];
  }
  @Get('/by-user/:userId')
  public async getGroupsByUser(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
    @Param('groupType', new ParseEnumPipe(UserGroupType)) groupType?: UserGroupType,
  ): Promise<Array<CompanyUserGroupV1Response>> {
    const res = await this.groupService.getAllGroupsForUser(userId);
    return res?.filter((r) => r.type === groupType).map(mapToResponse) ?? [];
  }
}

function mapToResponse(dto: UserGroupDTO): CompanyUserGroupV1Response {
  return {
    id: dto.id,
    ownerId: dto.ownerId,
    memberIds: dto.members,
    name: dto.name,
    type: dto.type,
  };
}
