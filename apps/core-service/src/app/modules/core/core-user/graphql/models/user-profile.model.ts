//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { subject } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Directive, Field, GraphQLISODateTime, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLString } from 'graphql';
import { pick } from 'lodash';
import { nullIfEmptyString } from '../../../../../lib/null-if-empty-string';
import { CoreAddress, CoreAddressInput } from '../../../graphql/models/address.model';
import type { CoreUserDTOAbility } from '../../acl/core-user.acl';
import type { CoreUserDTO, CoreUserProfileDTO } from '../../dto';

@ObjectType()
export class CoreUserProfileEmergencyContact {
  @Field(() => GraphQLString, { nullable: true })
  name?: string;

  @Field(() => GraphQLString, { nullable: true })
  relationship?: string;

  @Field(() => GraphQLString, { nullable: true })
  email?: string;

  @Field(() => GraphQLString, { nullable: true })
  phone?: string;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class CoreUserProfile {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLString)
  firstName: string;

  @Field(() => GraphQLString)
  lastName: string;

  @Field(() => GraphQLString, { nullable: true })
  phone?: string;

  @Field(() => CoreAddress, { nullable: true })
  address?: CoreAddress;

  @Field(() => GraphQLISODateTime, { nullable: true })
  dob?: Date;

  @Field(() => GraphQLString, { nullable: true })
  avatarUrl?: string;

  @Field(() => CoreUserProfileEmergencyContact, { nullable: true })
  emergencyContact?: CoreUserProfileEmergencyContact;

  /*@Field(() => GraphQLString)
  email: string; // requires a field resolver*/
}

@InputType()
export class CoreUserProfileEmergencyContactInput {
  @Field(() => GraphQLString, { nullable: true })
  name?: string;

  @Field(() => GraphQLString, { nullable: true })
  email?: string;

  @Field(() => GraphQLString, { nullable: true })
  relationship?: string;

  @Field(() => GraphQLString, { nullable: true })
  phone?: string;
}

@InputType()
export class CoreUserProfileInput {
  @Field(() => GraphQLString, { nullable: true })
  firstName?: string;

  @Field(() => GraphQLString, { nullable: true })
  lastName?: string;

  @Field(() => GraphQLString, { nullable: true })
  phone?: string;

  @Field(() => GraphQLString, { nullable: true })
  dob?: Date;

  @Field(() => CoreAddressInput, { nullable: true })
  address?: CoreAddressInput;

  @Field(() => CoreUserProfileEmergencyContactInput, { nullable: true })
  emergencyContact?: CoreUserProfileEmergencyContactInput;
}

export function mapUserDtoToCoreUserProfile(ability: CoreUserDTOAbility, u: CoreUserDTO): CoreUserProfile {
  const allowedFields = permittedFieldsOf(ability, 'read', subject('CoreUserDTO', u), {
    fieldsFrom: (r) => r.fields || Object.keys(u.profile),
  });

  const permittedFields = allowedFields.map((field) => field.replace('profile.', ''));

  const res = {
    id: u.id,
    ...pick(mapUserProfileDTOToCoreUserProfile(u.profile), permittedFields),
  };
  return res;
}

export function mapUserProfileDTOToCoreUserProfile(u: Omit<CoreUserProfileDTO, 'email'>): Omit<CoreUserProfile, 'id'> {
  return {
    firstName: u.firstName,
    lastName: u.lastName,
    dob: u.dob,
    phone: nullIfEmptyString(u.phone),
    avatarUrl: nullIfEmptyString(u.avatarUrl),
    address: {
      line1: nullIfEmptyString(u.address?.line1),
      line2: nullIfEmptyString(u.address?.line2),
      city: nullIfEmptyString(u.address?.city),
      state: nullIfEmptyString(u.address?.state),
      zipCode: nullIfEmptyString(u.address?.zipCode),
    },
    emergencyContact: {
      email: nullIfEmptyString(u.emergencyContact?.email),
      name: nullIfEmptyString(u.emergencyContact?.name),
      phone: nullIfEmptyString(u.emergencyContact?.phone),
      relationship: nullIfEmptyString(u.emergencyContact?.relationship),
    },
  };
}
