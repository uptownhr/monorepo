//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { TokenType } from '@bambeehr/authentication';
import { BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import * as HttpErrors from 'http-errors';
import type { CoreAuthInternalDTO } from '../dto/core-auth-internal.dto';
import { CoreAuthInternalService } from '../services/core-auth-internal.service';
import { CoreAuthByEmailBody } from './models/CoreAuthByEmailBody.model';
import { CoreAuthByUsernameBody } from './models/CoreAuthByUsernameBody.model';
import type { CoreAuthInternalResponse } from './models/CoreAuthInternalResponse.model';
import { CoreAuthSetPassowrdResetBody } from './models/CoreAuthSetPassowrdResetBody.model';
import { CoreAuthSwitchUser } from './models/CoreAuthSwitchUser.model';
import { CoreAuthUpdateOpenIdBody } from './models/CoreAuthUpdateOpenId.model';

@Controller('/internal/core-auth')
@UseGuards(BambeeAuthGuard(TokenType.Service))
export class InternalCoreAuthController {
  constructor(private authService: CoreAuthInternalService) {}

  @Get(':id')
  public async getByAuthId(@Param('id') authId: string): Promise<CoreAuthInternalResponse> {
    const res = await this.authService.getAuthById(authId);
    if (!res) {
      throw new HttpErrors[404]();
    }
    return mapDtoToResponse(res);
  }

  @Post(':id/password-reset-state')
  public async setPassowrdResetState(@Param('id') authId: string, @Body() body: CoreAuthSetPassowrdResetBody) {
    return this.authService.setPassowrdResetState(authId, body.token);
  }

  @Get('/find/by-user/:id')
  public async findByUserId(@Param('id') userId: string): Promise<CoreAuthInternalResponse> {
    const res = await this.authService.getAuthByUserId(userId);
    if (!res) {
      throw new HttpErrors[404]();
    }
    return mapDtoToResponse(res);
  }

  @Post('/find/by-email')
  public async findByEmail(@Body() body: CoreAuthByEmailBody): Promise<CoreAuthInternalResponse> {
    const res = await this.authService.getAuthByEmail(body.email);
    if (!res) {
      throw new HttpErrors[404]();
    }
    return mapDtoToResponse(res);
  }

  @Post('/find/by-username')
  public async findByUsername(@Body() body: CoreAuthByUsernameBody): Promise<CoreAuthInternalResponse> {
    const res = await this.authService.getAuthByUsername(body.username);
    if (!res) {
      throw new HttpErrors[404]();
    }
    return mapDtoToResponse(res);
  }

  @Post(':authId/switch')
  public async switchToNewUser(
    @Param('authId') authId: string,
    @Body() body: CoreAuthSwitchUser,
  ): Promise<CoreAuthInternalResponse> {
    let res;
    if (body.userId) {
      res = await this.authService.switchLoginUser(authId, body.userId);
    } else if (body.companyId) {
      res = await this.authService.switchLoginCompany(authId, body.companyId);
    } else {
      throw new HttpErrors[412]('Must specify either userId or companyId');
    }

    if (!res) {
      throw new HttpErrors[404]();
    }
    return mapDtoToResponse(res);
  }

  @Post(':authId/oauth-response')
  public async updateOauthData(@Param('authId') authId: string, @Body() body: CoreAuthUpdateOpenIdBody) {}
}

function mapDtoToResponse(dto: CoreAuthInternalDTO): CoreAuthInternalResponse {
  return {
    authId: dto.id,
    authActive: dto.authActive,
    avatarUrl: dto.avatarUr,
    passwordHash: dto.passwordHash,
    primaryRole: dto.primaryRole,
    userActive: dto.userActive,
    currentUserId: dto.currentUserId,
    currentCompanyId: dto.currentCompanyId,
    email: dto.email,
    fullName: dto.fullName,
    roles: dto.roles,
    userOptions: dto.userOptions.map((o) => ({
      companyId: o.companyId,
      companyName: o.companyName,
      userId: o.userId,
      active: o.active,
    })),
  };
}
