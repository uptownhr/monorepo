//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import type { Request } from 'express';
import { GraphQLString } from 'graphql';
import { AuthV3Service } from '../../../v3/services/auth-v3.service';
import { MfaChallengeService } from '../../services/mfa-challenge.service';
import { AuthMfaChallenge } from '../models/AuthMfaChallenge.model';
import { AuthMfaType, toMfaType } from '../models/AuthMfaType';

@Resolver()
export class AuthMfaChallengeResolver {
  constructor(
    @Inject(MfaChallengeService) private mfaService: MfaChallengeService,
    @Inject(AuthV3Service) private authService: AuthV3Service,
  ) {}

  @Mutation(() => AuthMfaChallenge)
  async createChallenge(
    @Args('reason', { type: () => GraphQLString }) reason: string,
    @Args('type', { type: () => AuthMfaType }) type: AuthMfaType,
    @AuthUser() currentUser: CurrentUser,
    @Context() ctx: { req: Request },
  ): Promise<AuthMfaChallenge> {
    const deviceId = await this.authService.getOrCreateDeviceIdFromRequest(ctx.req);
    const userAgent = ctx.req.headers['user-agent'] ?? 'unknown';
    const response = await this.mfaService.createChallenge(
      currentUser.authId,
      deviceId,
      userAgent,
      reason,
      toMfaType(type),
    );

    return {
      nonce: response.nonce,
      expiration: response.expiration,
    };
  }
}
