//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, TokenType } from '@bambeehr/authentication';
import { AuthUser, BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthV3Service } from '../services/auth-v3.service';
import { MasqueradeV3RequestBody } from './models/MasqueradeV3RequestBody';
import { MasqueradeV3Response } from './models/MasqueradeV3Response';

@Controller('/auth/internal/v3/masquerade')
@ApiTags('AuthV3')
@UseGuards(BambeeAuthGuard(TokenType.Internal, TokenType.Service))
export class InternalV3MasqController {
  constructor(protected authService: AuthV3Service) {}

  @Post()
  @ApiResponse({ status: 201, type: MasqueradeV3Response })
  async generateMasquerade(@AuthUser() currentUser: CurrentUser, @Body() body: MasqueradeV3RequestBody) {
    return this.authService.getMasqToken(currentUser, body.userId);
  }
}
