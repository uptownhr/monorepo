//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ObjectType()
export class CoreAddress {
  @Field(() => GraphQLString, { nullable: true })
  line1?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  line2?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  city?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  state?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  zipCode?: string | null;
}

@InputType()
export class CoreAddressInput {
  @Field(() => GraphQLString, { nullable: true })
  line1?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  line2?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  city?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  state?: string | null;

  @Field(() => GraphQLString, { nullable: true })
  zipCode?: string | null;
}
