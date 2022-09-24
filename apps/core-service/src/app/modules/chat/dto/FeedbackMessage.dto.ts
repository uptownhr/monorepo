//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export enum FeedbackValueDTO {
  BelowExpectations = 'below-expectations',
  MeetsExpectations = 'meets-expectations',
  AboveExpectations = 'above-expectations',
}

export interface FeedbackMessageInputDTO {
  readonly value: FeedbackValueDTO;
  readonly senderId: string;
  readonly recipientId: string;
  readonly companyId: string;
  readonly channelId: string;
  readonly message: string;
}

export interface FeedbackMessageOutputDTO {
  readonly value: FeedbackValueDTO;
  readonly message: string;
  readonly senderId: string;
  readonly recipientId: string;
  readonly channelId: string;
  readonly createdAt: Date;
  readonly messageId: bigint;
  readonly feedbackId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly raw: any;
}
