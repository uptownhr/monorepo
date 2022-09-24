//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import * as prisma from '../../core/prisma/core-prisma.service';
import { FeedbackValueDTO } from '../dto/FeedbackMessage.dto';

@Injectable()
export class FeedbackRepository {
  constructor(private prismaService: prisma.CorePrismaService) {}

  async createFeedback(by: string, to: string, value: FeedbackValueDTO) {
    const feedbackItem = await this.prismaService.coreUserFeedback.create({
      data: {
        byUserId: by,
        forUserId: to,
        value: toDbValue(value),
      },
    });

    return feedbackItem.id;
  }

  async updateFeedback(id: string, messageId: bigint, channelId: string, message: string) {
    await this.prismaService.coreUserFeedback.update({
      where: {
        id,
      },
      data: {
        messageId,
        channelId,
        message,
      },
    });
  }

  async getUserFeedback(userId: string, count = 3): Promise<FeedbackDto[]> {
    const res = await this.prismaService.coreUserFeedback.findMany({
      where: {
        forUserId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: count,
    });

    return res.filter((i) => !!i).map(mapDbToDto);
  }

  async getFeedbackById(id: string): Promise<FeedbackDto | null> {
    const res = await this.prismaService.coreUserFeedback.findFirst({
      where: {
        id,
      },
    });
    if (!res) {
      return null;
    }

    return mapDbToDto(res);
  }
}

export class FeedbackDto {
  id: string;
  senderId: string;
  recipientId: string;
  channelId: string;
  value: FeedbackValueDTO;
  messageId?: bigint;
  message?: string;
  createdAt: Date;
}

export interface CreateFeedbackDto {
  senderId: string;
  recipientId: string;
  value: FeedbackValueDTO;
  messageId?: number;
}

export interface UpdateFeedbackDto {
  id: string;
  value?: FeedbackValueDTO;
  messageId?: number;
}

export interface FeedbackDto {}

function toDbValue(v: FeedbackValueDTO): prisma.CoreUserFeedbackValue {
  switch (v) {
    case FeedbackValueDTO.AboveExpectations:
      return prisma.CoreUserFeedbackValue.ABOVE_EXPECTATIONS;
    case FeedbackValueDTO.MeetsExpectations:
      return prisma.CoreUserFeedbackValue.MEETS_EXPECTATIONS;
    case FeedbackValueDTO.BelowExpectations:
      return prisma.CoreUserFeedbackValue.BELOW_EXPECTATIONS;
  }
}

function fromDbValue(v: prisma.CoreUserFeedbackValue): FeedbackValueDTO {
  switch (v) {
    case prisma.CoreUserFeedbackValue.ABOVE_EXPECTATIONS:
      return FeedbackValueDTO.AboveExpectations;
    case prisma.CoreUserFeedbackValue.MEETS_EXPECTATIONS:
      return FeedbackValueDTO.MeetsExpectations;
    case prisma.CoreUserFeedbackValue.BELOW_EXPECTATIONS:
      return FeedbackValueDTO.BelowExpectations;
  }
}

function mapDbToDto(d): FeedbackDto {
  return {
    id: d.id,
    senderId: d.byUserId.trim(),
    recipientId: d.forUserId.trim(),
    channelId: d.channelId.trim(),
    messageId: d.messageId ?? undefined,
    message: d.message ?? undefined,
    createdAt: d.createdAt,
    value: fromDbValue(d.value),
  };
}
