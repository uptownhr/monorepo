//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { registerEnumType } from '@nestjs/graphql';

export enum ChatMessageTypeEnum {
  Text,
  Feedback,
}

registerEnumType(ChatMessageTypeEnum, {
  name: 'ChatMessageTypeEnum',
  description: 'The message type as applicable to Bambee Chat',
  valuesMap: {
    Text: {
      description: 'This message is just simple text and does not to be decoded or enriched.',
    },
    Feedback: {
      description: 'This message represents a customized feedback item, containing a feedback value.',
    },
  },
});
