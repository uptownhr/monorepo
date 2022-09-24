//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ObjectID } from 'bson';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsBsonIdConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(maybeId: any, _args: ValidationArguments) {
    return ObjectID.isValid(maybeId);
  }
}

/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsBsonId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBsonIdConstraint,
    });
  };
}
