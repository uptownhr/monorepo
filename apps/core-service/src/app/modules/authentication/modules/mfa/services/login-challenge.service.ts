import { Inject, Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import type { AuthV3MfaChallengeRequestBody } from '../../v3/controllers/models/AuthV3MfaChallengeRequestBody';
import type { NonceV3GenerateResponse } from '../../v3/controllers/models/NonceV3GenerateResponse';
import { ChallengeInProgressError } from '../types/ChallengeInProgressError';
import { MfaType } from '../types/MfaType';
import { MfaChallengeService } from './mfa-challenge.service';

@Injectable()
export class LoginChallengeService {
  constructor(@Inject(MfaChallengeService) protected mfaService: MfaChallengeService) {}

  async handleLoginChallenge(
    request: Request,
    response: Response,
    dto: AuthUserDTO,
    deviceId: string,
    mfa?: AuthV3MfaChallengeRequestBody,
  ): Promise<NonceV3GenerateResponse | undefined> {
    if (await this.mfaService.isChallengeRequired(dto.id, deviceId, 'login')) {
      const userAgent = request.headers['user-agent'] ?? 'unknown';
      if (!mfa) {
        /**
         * TODO we are currently hardcoding the SMS challenge here.
         * In the future we want to have a "default" challenge to user.
         *
         * We know enough by now to possibly prompt the user to select a challenge.
         */
        try {
          const challenge = await this.mfaService.createChallenge(dto.id, deviceId, userAgent, 'login', MfaType.SMS);
          response.status(412);
          return challenge;
        } catch (e) {
          if (e instanceof ChallengeInProgressError) {
            response.status(412);
            return {
              nonce: e.challengeId,
              expiration: e.expiration,
            };
          }
          throw e;
        }
      } else {
        // atempt to confirm the MFA challenge
        // this will throw on failure and continue on success
        await this.mfaService.attemptChallenge(dto, {
          deviceId,
          userAgent,
          reason: 'login',
          nonce: mfa.nonce,
          response: mfa.response,
          rememberDevice: mfa.rememberDevice ?? false,
          type: MfaType.SMS,
        });
      }
    }
  }
}
