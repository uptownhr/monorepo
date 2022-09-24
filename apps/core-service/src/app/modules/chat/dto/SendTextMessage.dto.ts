//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { ChatMessageType } from '../types/ChatMessageType';

export interface SendTextMessageDTO {
  readonly senderId: string;
  readonly recipientId: string;
  readonly companyId: string;
  readonly channelId: string;
  readonly threadParentId?: bigint;
  readonly type: ChatMessageType;
  readonly data: string;
}
