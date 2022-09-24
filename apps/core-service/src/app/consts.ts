//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { TokenType } from '@bambeehr/authentication';
import { BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { UseGuards } from '@nestjs/common';

export const UserTokenTypes = [TokenType.JWTv2, TokenType.JWTv3, TokenType.Internal, TokenType.JWTv3, TokenType.MasqV3];

// eslint-disable-next-line @typescript-eslint/naming-convention
export function UserGuard() {
  return UseGuards(BambeeAuthGuard(...UserTokenTypes));
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function UserAndSystemGuard() {
  return UseGuards(BambeeAuthGuard(TokenType.Service, ...UserTokenTypes));
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SystemOnlyGuard() {
  return UseGuards(BambeeAuthGuard(TokenType.Service));
}
