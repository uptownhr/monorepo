//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

export class ChannelNotFoundException extends NotFoundException {}
export class ChatUserNotFoundException extends NotFoundException {}
export class ChatUserNotMemberException extends NotFoundException {}
export class UnknownChatException extends InternalServerErrorException {}
