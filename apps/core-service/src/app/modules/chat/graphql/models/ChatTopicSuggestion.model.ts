//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { CoreUser } from '../../../core/core-user/graphql/models/user.model';

@ObjectType()
export class ChatTopicSuggestion {
  @Field(() => GraphQLString)
  type: string;

  /**
   * Q: Why are we crossing the module boundary here?
   * A: NestJS DOES NOT SUPPORT referencing a type by name, or marking a type as "external" or "defined elsewhere"  This means
   * that so long as core-service exposes a single graphQL server, we are REQUIRED to use types defined in other modules.
   *
   * If/when this module is split out, this definition can be changed to properly support federation (it will be unresolvable
   * in this service module)
   */
  @Field(() => [CoreUser], {
    description: 'A list of CoreUsers that a suggested topic could be sent to.',
  })
  recipients: Array<Pick<CoreUser, 'id'>>;

  // @Field(() => [UserGroupStub], { description: 'A list of chat groups that a suggested topic may be sent to.' })
  // groups: UserGroupStub[];
}
