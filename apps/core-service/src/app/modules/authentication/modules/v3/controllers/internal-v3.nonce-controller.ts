//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { CurrentUser, isSystemUser, TokenType } from '@bambeehr/authentication';
import { AuthUser, BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as HttpErrors from 'http-errors';
import { NonceV3Service } from '../services/nonce-v3.service';
import { NonceV3GenerateRequestBody } from './models/NonceV3GenerateRequestBody';
import { NonceV3GenerateResponse } from './models/NonceV3GenerateResponse';
import { NonceV3GetResponse } from './models/NonceV3GetResponse';

@Controller('/auth/internal/v3/nonce')
@ApiTags('AuthV3')
@UseGuards(BambeeAuthGuard(TokenType.Internal, TokenType.Service))
export class InternalV3NonceController {
  constructor(protected nonceService: NonceV3Service) {}

  @Post()
  @ApiResponse({ status: 201, type: NonceV3GenerateResponse })
  async generateNonce(@AuthUser() currentUser: CurrentUser, @Body() body?: NonceV3GenerateRequestBody) {
    if (isSystemUser(currentUser) && (!body?.authId || !body.userId)) {
      throw new HttpErrors[412]('Nonce Generation requires a real subject.');
    }

    return this.nonceService.generateUserNonce(body?.userId ?? currentUser.userId, body?.authId ?? currentUser.authId, {
      expiration: body?.expiration ?? '10m',
    });
  }

  @Get('/:nonce_val')
  @ApiResponse({ status: 200, type: NonceV3GetResponse })
  async verifyNonce(@Param('nonce_val') token: string) {
    return this.nonceService.verifyUserNonce(token);
  }

  @Delete('/:nonce_val')
  @ApiResponse({ status: 200, type: NonceV3GetResponse })
  async consumeNonce(@Param('nonce_val') token: string) {
    return this.nonceService.consumeNonce(token);
  }
}
