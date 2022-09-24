//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { add, subDays } from 'date-fns';
import * as HttpErrors from 'http-errors';
import { ANALYTICS_KEY } from '../../../../event-client/keys';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { AuthServiceRepository } from '../../../repositories/auth-service.repository';
import type { NonceV3GenerateResponse } from '../../v3/controllers/models/NonceV3GenerateResponse';
import { NonceV3Service } from '../../v3/services/nonce-v3.service';
import { MFA_CHALLENGE_NONCE_PREFIX } from '../consts';
import type { MfaSMSConfigDTO } from '../dto/MfaConfig.dto';
import { getPseudorandomChallengeCode } from '../lib/get-psedurandom-challenge-code';
import { MfaRepository } from '../repositories/mfa.repository';
import { ChallengeInProgressError } from '../types/ChallengeInProgressError';
import type { MfaNonceData } from '../types/MfaNonceData';
import { MfaType } from '../types/MfaType';
import type { SmsNonceData } from '../types/SmsNonceData';
import { MfaChallengeTypeService } from './mfa-challenge-type.service';
import type Analytics = require('analytics-node');

@Injectable()
export class MfaChallengeService {
  constructor(
    @Inject(AuthServiceRepository) private authRepo: AuthServiceRepository,
    @Inject(MfaRepository) private mfaRepo: MfaRepository,
    @Inject(NonceV3Service) private nonceService: NonceV3Service,
    @Inject(MfaChallengeTypeService) private typeService: MfaChallengeTypeService,
    @Inject(ANALYTICS_KEY) protected segment: Analytics,
  ) {}

  async isChallengeRequired(authId: string, deviceId: string, reason: string): Promise<boolean> {
    const confirmedEnrollments = await this.mfaRepo.getConfirmedEnrollments(
      authId,
      ...Object.values(MfaType).filter((t) => t !== MfaType.BACKUP),
    );
    if (confirmedEnrollments.length === 0) {
      return false;
    }

    if (reason === 'login') {
      const recentChallenges = await this.mfaRepo.getSuccessfulRememberedChallenges(
        authId,
        deviceId,
        reason,
        subDays(new Date(), 30),
      );
      if (recentChallenges.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  }

  /**
   * When a challenge may be required, invoke this method to generate a challenge.
   * Does not create a new challenge for a device if there is an existing one that hasn't expired
   * @param authId
   * @param deviceId
   * @param reason
   */
  async createChallenge(
    authId: string,
    deviceId: string,
    userAgent: string,
    reason: string,
    mfaType: MfaType,
  ): Promise<Required<NonceV3GenerateResponse>> {
    const user = await this.authRepo.findByAuthId(authId);
    if (!user) {
      throw new HttpErrors[404]('User not found');
    }

    const configs = await this.mfaRepo.getEnrollmentDetailsByAuth(authId, mfaType);

    if (!configs.length) {
      throw new HttpErrors[412]('No MFA devices enrolled');
    }

    const currentChallenge = await this.mfaRepo.getActiveChallengeForDevice(authId, deviceId, reason);

    if (currentChallenge) {
      throw new ChallengeInProgressError(
        'A challenge is already in progress',
        currentChallenge.challengeId,
        add(currentChallenge.createdAt, { minutes: 5 }),
      );
    }

    const newChallenge = await this.mfaRepo.createChallenge(authId, deviceId, userAgent, reason, mfaType);

    if (mfaType === MfaType.SMS) {
      // there should only ever be one phone number.
      const config = configs[0] as MfaSMSConfigDTO;

      /**
       * Generate a code!
       * NOTE that we never actually store this but only transmit it by SMS.
       * We'll bcrypt it and store it with a nonce.
       */
      const code = getPseudorandomChallengeCode();

      // generate a nonce!
      const verifyer = bcrypt.hashSync(code, 10);
      const data: SmsNonceData = {
        type: MfaType.SMS,
        verifyer,
        authId,
        challengeId: newChallenge.challengeId,
        device: deviceId,
        configId: config.id,
        deviceId: newChallenge.deviceId, // this is the DB id of the device, not the unique identifier value
      };

      const nonce = await this.nonceService.generateNonce(JSON.stringify(data), {
        nonceId: newChallenge.challengeId,
        expiration: '5m',
        prefix: MFA_CHALLENGE_NONCE_PREFIX,
      });

      this.segment.track({
        userId: user.id,
        event: 'mfa-sms-challenge',
        properties: {
          code,
          phoneNumber: config.configuration.phoneNumber,
        },
      });
      nonce.metadata = {
        phoneLast4: config.configuration.phoneNumber.slice(-4),
      };
      return nonce as Required<NonceV3GenerateResponse>;
    }

    throw new Error(`MFA type ${mfaType} not supported`);
  }

  async attemptChallenge(authDto: AuthUserDTO, info: AttemptChallengeInfo): Promise<void> {
    const nonceData = await this.nonceService.verifyNonce<MfaNonceData<typeof info.type>>(
      info.nonce,
      MFA_CHALLENGE_NONCE_PREFIX,
    );
    const {
      parsed: { authId, challengeId, device, deviceId },
    } = nonceData;
    const currentChallenge = await this.mfaRepo.getChallengeById(challengeId);

    if (authId !== authDto.id) {
      throw new HttpErrors[403](`No challenge in progress for this device`);
    }

    if (info.deviceId !== device) {
      throw new HttpErrors[403](`No challenge in progress for this device`);
    }

    if (
      !currentChallenge ||
      currentChallenge.device !== info.deviceId ||
      currentChallenge.authId.trim() !== authDto.id ||
      currentChallenge.rememberUntil >= new Date()
    ) {
      throw new HttpErrors[403]('No challenge in progress for this device');
    }
    // get possible configs
    const configs = await this.mfaRepo.getEnrollmentDetailsByAuth(authDto.id, info.type);

    if (!configs.length) {
      throw new HttpErrors[403](`MFA type '${info.type}' not configured`);
    }
    const validTypes = await this.typeService.validTypesForReason(info.reason);

    /**
     * TODO
     * refactor all of this
     */
    for (const enrollment of configs) {
      if (!validTypes.includes(enrollment.type)) {
        continue;
      }
      try {
        // why an array?  you might have multiple U2F devices enrolled.
        if (enrollment.type === MfaType.SMS) {
          const code = (nonceData.parsed as SmsNonceData).verifyer;
          if (bcrypt.compareSync(info.response, code)) {
            await this.mfaRepo.okayChallenge({
              authId,
              challengeId,
              configId: enrollment.id,
              deviceId,
              rememberUntil: info.rememberDevice
                ? await this.typeService.rememberUntilForReason(info.reason)
                : new Date(),
            });
            await this.nonceService.consumeNonce(info.nonce, MFA_CHALLENGE_NONCE_PREFIX);
            return;
          } else {
            await this.mfaRepo.failChallenge({
              authId,
              challengeId,
              configId: enrollment.id,
              deviceId,
            });
            throw new HttpErrors[403]('Unsuccessful challenge');
          }
        }
      } catch (e) {
        await this.mfaRepo.failChallenge({
          authId,
          challengeId,
          configId: enrollment.id,
          deviceId,
        });
        throw e;
      }
    }
    // create an attempt

    throw new Error('Method not implemented.');
  }
}

export interface AttemptChallengeInfo {
  deviceId: string;
  userAgent: string;
  reason: string;
  nonce: string;
  response: string;
  type: MfaType;
  rememberDevice: boolean;
}
