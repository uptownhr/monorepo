//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export function buildChannelId(userId1, userId2) {
  return 'conversation_' + [userId1, userId2].sort().join('_');
}
