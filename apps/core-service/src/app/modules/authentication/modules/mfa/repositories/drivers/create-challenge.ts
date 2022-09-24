//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type * as prisma from '../../../../../core/prisma/core-prisma.service';

export async function createChallenge(
  prismaService: prisma.CorePrismaService,
  authId: string,
  deviceId: string,
  userAgent: string,
  reason: string,
  mfaType: prisma.AuthMfaType,
) {
  return prismaService.authMfaChallenge.create({
    include: {
      authDevice: true,
    },
    data: {
      authId,
      authDevice: {
        connectOrCreate: {
          create: {
            authId,
            deviceId,
            userAgent,
          },
          where: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            authId_deviceId: {
              authId,
              deviceId,
            },
          },
        },
      },
      reason,
    },
  });
}
