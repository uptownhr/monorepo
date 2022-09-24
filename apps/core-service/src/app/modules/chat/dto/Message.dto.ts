//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { ChatMessageTypeEnum } from '../graphql/models/ChatMessageType.enum';

export interface MessageDTO {
  readonly id: number;
  readonly createdAt: Date;
  readonly userId: string;
  readonly data: string;
  readonly type: ChatMessageTypeEnum;
}
