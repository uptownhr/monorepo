//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { subMinutes } from 'date-fns';
import * as HttpErrors from 'http-errors';
import * as prisma from '../../../../core/prisma/core-prisma.service';
import type { DeviceDTO } from '../dto/Device.dto';
import type { MfaChallengeDTO } from '../dto/MfaChallenge.dto';
import type { MfaChallengeAttemptDTO } from '../dto/MfaChallengeAttempt.dto';
import type { MfaConfigDTO } from '../dto/MfaConfig.dto';
import type { MfaConfigInfoDTO } from '../dto/MfaConfigInfo.dto';
import type { MfaSuccessfulChallengeDTO } from '../dto/MfaSuccessfulChallenge.dto';
import { MfaType } from '../types/MfaType';
import { createChallenge } from './drivers/create-challenge';

@Injectable()
export class MfaRepository {
  constructor(private prismaService: prisma.CorePrismaService) {}

  /**
   * This will return all challenges within a given timeframe that
   * @param authId
   * @param deviceId
   * @param reason
   * @param since
   * @returns
   */
  async getSuccessfulRememberedChallenges(
    authId: string,
    deviceId: string,
    reason: string,
    since?: Date,
  ): Promise<MfaSuccessfulChallengeDTO[]> {
    const query: prisma.Prisma.AuthMfaChallengeFindManyArgs = {
      where: {
        authId,
        reason,
        authDevice: {
          deviceId,
        },
        rememberUntil: {
          gt: new Date(),
        },
        NOT: {
          succeededAt: null,
        },
        AuthMfaChallengeAttempt: {
          some: {
            wasSuccessful: true,
          },
        },
      },
      include: {
        authDevice: true,
        AuthMfaChallengeAttempt: {
          where: {
            wasSuccessful: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    };

    if (since) {
      query.where!.createdAt = {
        gte: since,
      };
    }

    const challenge = await this.prismaService.authMfaChallenge.findMany(query);

    if (!challenge) {
      throw new HttpErrors.NotFound('Challenge not found');
    }

    return challenge.map((c) => ({
      authId,
      deviceId: c.authDeviceId,
      device: deviceId,
      challengeId: c.id,
      reason,
      succeededAt: c.succeededAt!,
      rememberUntil: c.rememberUntil,
      createdAt: c.createdAt,
    }));
  }

  async createAttempt(authId: string, configId: string, challengeId: string, wasSuccessful: boolean) {
    const attempt = await this.prismaService.authMfaChallengeAttempt.create({
      data: {
        wasSuccessful,
        authId,
        authMfaConfigId: configId,
        authMfaChallengeId: challengeId,
      },
    });

    return attempt.id;
  }

  async getActiveChallengeForDevice(authId: string, deviceId: string, reason: string): Promise<MfaChallengeDTO | null> {
    const checkTime = subMinutes(new Date(), 5); // you have 5 minutes to complete the challenge

    const challenge = await this.prismaService.authMfaChallenge.findFirst({
      where: {
        authId,
        reason,
        authDevice: {
          deviceId,
        },
        createdAt: {
          gte: checkTime,
        },
        succeededAt: null,
        AuthMfaChallengeAttempt: {
          none: {
            wasSuccessful: true,
          },
        },
      },
      include: {
        authDevice: true,
        AuthMfaChallengeAttempt: {
          where: {
            wasSuccessful: false,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!challenge) {
      return null;
    }

    return mapChallenge(challenge);
  }

  async attemptChallenge(authId: string, challengeId: string, response: string) {}

  async createChallenge(
    authId: string,
    deviceId: string,
    userAgent: string,
    reason: string,
    mfaType: MfaType,
  ): Promise<MfaChallengeDTO> {
    /**
     * A driver function lets us properlty type the return value for usage in `mapChallenge`.
     * See https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#solution-1
     */
    const challenge = await createChallenge(
      this.prismaService,
      authId,
      deviceId,
      userAgent,
      reason,
      toPrismaType(mfaType),
    );
    return mapChallenge(challenge);
  }

  async getEnrollmentDetails(enrollmentId: string): Promise<MfaConfigInfoDTO> {
    const details = await this.prismaService.authMfaConfig.findFirst({
      where: { id: enrollmentId },
      include: {
        AuthMfaChallenge: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            authDevice: true,
            AuthMfaChallengeAttempt: {
              where: {
                wasSuccessful: true,
              },
            },
          },
        },
      },
    });

    if (!details) {
      throw new HttpErrors.NotFound('Enrollment not found');
    }

    return mapEnrollmentDetails(details);
  }

  async getEnrollmentDetailsByAuth(authId: string, ...types: MfaType[]): Promise<MfaConfigInfoDTO[]> {
    const details = await this.prismaService.authMfaConfig.findMany({
      where: {
        authId,
        type: types.length ? { in: types.map(toPrismaType) } : undefined,
        NOT: {
          confirmedAt: null,
        },
      },
      include: {
        AuthMfaChallenge: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            authDevice: true,
            AuthMfaChallengeAttempt: {
              where: {
                wasSuccessful: true,
              },
            },
          },
        },
      },
    });

    if (!details) {
      throw new HttpErrors.NotFound('Enrollment not found');
    }

    return details.map(mapEnrollmentDetails);
  }

  async getEnrollments(authId: string, ...types: MfaType[]) {
    const res = await this.prismaService.authMfaConfig.findMany({
      where: {
        authId,
        type: types.length
          ? {
              in: types.map(toPrismaType),
            }
          : undefined,
      },
    });
    return res.map(mapEnrollment);
  }

  async getConfirmedEnrollments(authId: string, ...types: MfaType[]) {
    const res = await this.prismaService.authMfaConfig.findMany({
      where: {
        authId,
        NOT: {
          confirmedAt: null,
        },
        type: types.length
          ? {
              in: types.map(toPrismaType),
            }
          : undefined,
      },
    });
    return res.map(mapEnrollment);
  }

  async confirmEnrollment(enrollmendIt: string) {
    await this.prismaService.authMfaConfig.update({
      where: { id: enrollmendIt },
      data: {
        confirmedAt: new Date(),
      },
    });
  }

  async createOrGetDevice(authId: string, device: DeviceDTO) {
    const deviceRecord = await this.prismaService.authDevice.upsert({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        authId_deviceId: {
          authId: authId,
          deviceId: device.id,
        },
      },
      create: {
        authId: authId,
        deviceId: device.id,
        userAgent: device.userAgent,
      },
      update: {},
    });
    return deviceRecord.id;
  }

  async createBackup(authId: string, hashedBackupKey: string) {
    const now = new Date();
    const enrollment = await this.prismaService.authMfaConfig.create({
      data: {
        authId,
        type: toPrismaType(MfaType.BACKUP),
        configuration: {
          hashedBackupKey,
        },
        confirmedAt: now,
        createdAt: now,
      },
    });

    return enrollment.id;
  }

  async createNewEnrollment<T>(
    config: Omit<MfaConfigDTO<T>, 'id' | 'createdAt'>,
    device: DeviceDTO,
  ): Promise<MfaChallengeDTO & { configId?: string }> {
    // TODO this could all be one query but the types prisma generate prevent building :(
    const enrollment = await this.prismaService.authMfaConfig.create({
      data: {
        authId: config.authId,
        type: toPrismaType(config.type),
        configuration: config.configuration,
      },
    });

    const authDeviceId = await this.createOrGetDevice(config.authId, device);

    const challenge = await this.prismaService.authMfaChallenge.create({
      data: {
        authId: config.authId,
        authMfaConfigId: enrollment.id,
        authDeviceId,
      },
    });

    return {
      authId: config.authId,
      device: device.id,
      deviceId: authDeviceId,
      challengeId: challenge.id,
      configId: enrollment.id,
      rememberUntil: challenge.rememberUntil,
      createdAt: challenge.createdAt,
    };
  }

  async getChallengeById(challengeId: string): Promise<MfaChallengeDTO> {
    const challenge = await this.prismaService.authMfaChallenge.findFirst({
      where: { id: challengeId },
      include: {
        authDevice: true,
      },
    });
    if (!challenge) {
      throw new HttpErrors.NotFound('Challenge not found');
    }

    if (!challenge.authDeviceId) {
      throw new HttpErrors.NotFound('Challenge not found');
    }

    return {
      authId: challenge.authId,
      challengeId: challenge.id,
      deviceId: challenge.authDeviceId,
      device: challenge.authDevice.deviceId,
      createdAt: challenge.createdAt,
      rememberUntil: challenge.rememberUntil,
    };
  }

  async failChallenge(challenge: MfaChallengeAttemptDTO) {
    return this.prismaService.authMfaChallengeAttempt.create({
      data: {
        authMfaChallengeId: challenge.challengeId,
        wasSuccessful: false,
        authId: challenge.authId,
        authMfaConfigId: challenge.configId,
      },
    });
  }

  async okayChallenge(challenge: MfaChallengeAttemptDTO) {
    await this.prismaService.authMfaChallengeAttempt.create({
      data: {
        authMfaChallengeId: challenge.challengeId,
        wasSuccessful: true,
        authId: challenge.authId,
        authMfaConfigId: challenge.configId,
      },
    });

    await this.prismaService.authMfaChallenge.update({
      where: {
        id: challenge.challengeId,
      },
      data: {
        succeededAt: new Date(),
        rememberUntil: challenge.rememberUntil,
      },
    });
  }
}

function mapChallenge(result: prisma.Prisma.PromiseReturnType<typeof createChallenge>): MfaChallengeDTO {
  return {
    authId: result.authId.trim(),
    challengeId: result.id,
    deviceId: result.authDeviceId,
    rememberUntil: result.rememberUntil,
    createdAt: result.createdAt,
    device: result.authDevice.deviceId,
  };
}

function mapEnrollmentDetails(result): MfaConfigInfoDTO {
  return {
    authId: result.authId.trim(),
    createdAt: result.createdAt,
    id: result.id,
    type: fromPrismaType(result.type),
    confirmedAt: result.confirmedAt,
    lastConfimedDevice: result?.AuthMfaChallenge?.[0]?.authDevice?.userAgent,
    lastConfirmedAt: result?.AuthMfaChallenge?.[0]?.AuthMfaChallengeAttempt?.[0].createdAt,
    configuration: result?.configuration,
  };
}
function mapEnrollment<T>(result: prisma.AuthMfaConfig): MfaConfigDTO<T> {
  return {
    authId: result.authId.trim(),
    createdAt: result.createdAt,
    id: result.id,
    type: fromPrismaType(result.type),
    confirmedAt: result.confirmedAt,
    configuration: result.configuration as T,
  };
}

function toPrismaType(t: MfaType) {
  switch (t) {
    case MfaType.SMS:
      return prisma.AuthMfaType.SMS;
    case MfaType.BACKUP:
      return prisma.AuthMfaType.BACKUP;
    case MfaType.PASSWORD:
      return prisma.AuthMfaType.PASSWORD;
  }
}

function fromPrismaType(t: prisma.AuthMfaType) {
  switch (t) {
    case prisma.AuthMfaType.SMS:
      return MfaType.SMS;
    case prisma.AuthMfaType.BACKUP:
      return MfaType.BACKUP;
    case prisma.AuthMfaType.PASSWORD:
      return MfaType.PASSWORD;
  }
}
