//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { Request } from 'express';
import { GraphQLBoolean } from 'graphql';
import { AuthV3Service } from '../../../v3/services/auth-v3.service';
import type { MfaConfigInfoDTO } from '../../dto/MfaConfigInfo.dto';
import { MfaEnrollmentService } from '../../services/mfa-enrollment.service';
import { MfaType } from '../../types/MfaType';
import { AuthMfaChallenge } from '../models/AuthMfaChallenge.model';
import { AuthMfaChallengeResponseInput } from '../models/AuthMfaChallengeResponseInput.model';
import { AuthMfaConfig } from '../models/AuthMfaConfig.model';
import { AuthMfaSmsEnrollmentInput } from '../models/AuthMfaSmsEnrollmentInput.model';
import { fromMfaType } from '../models/AuthMfaType';

@Resolver()
export class AuthMfaSmsEnrollmentResolver {
  constructor(private mfaService: MfaEnrollmentService, private authService: AuthV3Service) {}

  @Mutation(() => AuthMfaChallenge)
  async enrollMfaDevice(
    @Args('input') input: AuthMfaSmsEnrollmentInput,
    @AuthUser() currentUser: CurrentUser,
    @Context() ctx: { req: Request },
  ): Promise<AuthMfaChallenge> {
    const deviceId = await this.authService.getOrCreateDeviceIdFromRequest(ctx.req);

    const response = await this.mfaService.createSmsEnrollment(currentUser, input.phoneNumber, {
      id: deviceId,
      userAgent: ctx.req.headers['user-agent'] ?? 'unknown',
    });

    return {
      nonce: response.nonce,
      expiration: response.expiration,
    };
  }

  /**
   * confirming enrollment is almost identical to responding to a challenge, but it
   * requires the user to be logged in.
   */
  @Mutation(() => AuthMfaConfig)
  async confirmUserMfaEnrollment(
    @Args('input') input: AuthMfaChallengeResponseInput,
    @AuthUser() currentUser: CurrentUser,
    @Context() ctx: { req: Request },
  ): Promise<AuthMfaConfig> {
    const deviceId = await this.authService.getOrCreateDeviceIdFromRequest(ctx.req);
    const details = await this.mfaService.confirmEnrollment(currentUser, input.nonce, input.response, deviceId);

    return mapDtoToAuthMfaConfig(details);
  }

  /**
   * By default, gets all MFA types except for the backup code.  It has a slightly different workflow
   * @param currentUser
   * @param includeUnconfirmed
   * @returns
   */
  @Query(() => [AuthMfaConfig])
  async getMyMfaEnrollments(
    @AuthUser() currentUser: CurrentUser,
    @Args('includeUnconfirmed', { nullable: true, type: () => GraphQLBoolean, defaultValue: false })
    includeUnconfirmed = false,
  ): Promise<AuthMfaConfig[]> {
    const results = await this.mfaService.getEnrollmentsInfo(
      currentUser.authId,
      ...Object.values(MfaType).filter((t) => t !== MfaType.BACKUP),
    );
    return results.map(mapDtoToAuthMfaConfig);
  }
}

function mapDtoToAuthMfaConfig(e: MfaConfigInfoDTO): AuthMfaConfig {
  return {
    mfaType: fromMfaType(e.type),
    createdAt: e.createdAt,
    lastChallengedAt: e.lastConfirmedAt,
    lastDevice: e.lastConfimedDevice,
    backupCode: e.backupCode,
  };
}
