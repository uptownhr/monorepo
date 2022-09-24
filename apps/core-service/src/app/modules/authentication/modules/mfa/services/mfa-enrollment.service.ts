//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as HttpErrors from 'http-errors';
import { ANALYTICS_KEY } from '../../../../event-client/keys';
import type { NonceV3GenerateResponse } from '../../v3/controllers/models/NonceV3GenerateResponse';
import { NonceV3Service } from '../../v3/services/nonce-v3.service';
import { MFA_ENROLLMENT_NONCE_PREFIX } from '../consts';
import type { DeviceDTO } from '../dto/Device.dto';
import type { MfaConfigInfoDTO } from '../dto/MfaConfigInfo.dto';
import { BACKUP_CHARS, getPseudorandomChallengeCode } from '../lib/get-psedurandom-challenge-code';
import { MfaRepository } from '../repositories/mfa.repository';
import { MfaType } from '../types/MfaType';
import type { SmsNonceData } from '../types/SmsNonceData';
import Analytics = require('analytics-node');

@Injectable()
export class MfaEnrollmentService {
  constructor(
    private mfaRepo: MfaRepository,
    private nonceService: NonceV3Service,
    @Inject(ANALYTICS_KEY) protected segment: Analytics,
  ) {}

  async getSmsEnrollments(authId: string) {
    return this.getEnrollments(authId, MfaType.SMS);
  }

  async getEnrollmentInfo(enrollmentId: string) {
    return this.mfaRepo.getEnrollmentDetails(enrollmentId);
  }

  async getEnrollments(authId: string, ...types: MfaType[]) {
    return this.mfaRepo.getConfirmedEnrollments(authId, ...types);
  }

  async getEnrollmentsInfo(authId: string, ...types: MfaType[]) {
    return this.mfaRepo.getEnrollmentDetailsByAuth(authId, ...types);
  }

  async createBackupKey({ authId }: CurrentUser) {
    const prefix = getPseudorandomChallengeCode(3, BACKUP_CHARS);
    const part1 = getPseudorandomChallengeCode(4, BACKUP_CHARS);
    const part2 = getPseudorandomChallengeCode(5, BACKUP_CHARS);
    const part3 = getPseudorandomChallengeCode(4, BACKUP_CHARS);
    const part4 = getPseudorandomChallengeCode(5, BACKUP_CHARS);

    const backupKey = `${prefix}-${part1}-${part2}-${part3}-${part4}`;

    await this.mfaRepo.createBackup(authId, bcrypt.hashSync(backupKey, 10));
    return backupKey;
  }

  async createSmsEnrollment({ userId, authId }: CurrentUser, phoneNumber: string, device: DeviceDTO) {
    const enrollments = await this.getSmsEnrollments(authId);
    if (enrollments.length) {
      throw new HttpErrors.PreconditionFailed('SMS is already enrolled');
    }

    const newEnrollment = await this.mfaRepo.createNewEnrollment(
      {
        type: MfaType.SMS,
        authId,
        configuration: {
          phoneNumber,
        },
      },
      device,
    );

    /**
     * Generate a code!
     * NOTE that we never actually store this but only transmit it by SMS.
     * We'll bcrypt it and store it with a nonce.
     */
    const code = getPseudorandomChallengeCode();

    // generate a nonce!
    const verifyer = bcrypt.hashSync(code, 10);
    const nonce = await this.nonceService.generateNonce(
      JSON.stringify({
        verifyer,
        authId,
        challengeId: newEnrollment.challengeId,
        device: device.id,
        deviceId: newEnrollment.deviceId,
        configId: newEnrollment.configId,
      }),
      { prefix: MFA_ENROLLMENT_NONCE_PREFIX, expiration: '5m' },
    );

    // send over segment
    this.segment.track({
      userId,
      event: 'mfa-sms-challenge',
      properties: {
        phoneNumber,
        code,
      },
    });

    nonce.metadata = {
      phoneLast4: phoneNumber.slice(-4),
    };

    //return the nonce
    return nonce as Required<NonceV3GenerateResponse>;
  }

  /**
   * TODO: eventually, we will have different kinds of verification, e.g. one time code from an authenticator,
   * or a push notification from a trusted device (e.g. Bambee App on iphone)
   *
   * For now we only support SMS.
   */
  async confirmEnrollment(
    currentUser: CurrentUser,
    nonce: string,
    response: string,
    deviceId: string,
  ): Promise<MfaConfigInfoDTO & { backupCode?: string }> {
    const { parsed, expirationSeconds } = await this.nonceService.verifyNonce<SmsNonceData>(
      nonce,
      MFA_ENROLLMENT_NONCE_PREFIX,
    );
    if (expirationSeconds < 0) {
      throw new HttpErrors[403]('Nonce has expired');
    }

    if (parsed.device !== deviceId) {
      throw new HttpErrors[403]('Device mismatch');
    }

    const challenge = await this.mfaRepo.getChallengeById(parsed.challengeId);
    if (!challenge) {
      throw new HttpErrors[404]('MFA Challenge not found');
    }

    if (bcrypt.compareSync(response, parsed.verifyer)) {
      // create a "successful" attempt
      await this.mfaRepo.okayChallenge({ ...challenge, configId: parsed.configId });

      // confirm the configuration
      await this.mfaRepo.confirmEnrollment(parsed.configId);
      const allEnrollments = await this.mfaRepo.getEnrollmentDetailsByAuth(currentUser.authId);
      const details = allEnrollments.find((e) => e.id === parsed.configId);
      this.segment.track({
        userId: currentUser.userId,
        event: 'confirm-mfa-enrollment',
        properties: {
          type: details!.type,
        },
      });

      if (!allEnrollments.find((e) => e.type === MfaType.BACKUP)) {
        //create a backup code
        const backupCode = await this.createBackupKey(currentUser);
        return {
          ...details!,
          backupCode,
        };
      }

      return details!;
    } else {
      await this.mfaRepo.failChallenge({ ...challenge, configId: parsed.configId });
      // created a "failed" attempt
      throw new HttpErrors[403]('Invalid response');
    }
  }
}
