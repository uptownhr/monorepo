//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ObjectId } from 'bson';
import { IsBsonIdConstraint } from './IsBsonId.validator';

describe('IsBsonId Validator', () => {
  const v = new IsBsonIdConstraint();
  it('validates a bson', () => {
    expect(v.validate(new ObjectId(), {} as any)).toBeTruthy();
  });

  it('validates a bson string', () => {
    expect(v.validate(new ObjectId().toString(), {} as any)).toBeTruthy();
  });

  it('validates a integer', () => {
    expect(v.validate(5, {} as any)).toBeTruthy();
  });

  it('Fails on a string', () => {
    expect(v.validate('oh no', {} as any)).toBeFalsy();
  });
});
