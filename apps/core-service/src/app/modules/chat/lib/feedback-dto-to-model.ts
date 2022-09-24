//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { FeedbackValueDTO } from '../dto/FeedbackMessage.dto';
import { FeedbackMessageValuEnum } from '../graphql/models/messages/FeedbackMessageInput.model';

export function feedbackValueDtoToModel(value: FeedbackValueDTO): FeedbackMessageValuEnum {
  switch (value) {
    case FeedbackValueDTO.AboveExpectations:
      return FeedbackMessageValuEnum.AboveExpectations;
    case FeedbackValueDTO.MeetsExpectations:
      return FeedbackMessageValuEnum.MeetsExpectations;
    case FeedbackValueDTO.BelowExpectations:
      return FeedbackMessageValuEnum.BelowExpectations;
  }
}
