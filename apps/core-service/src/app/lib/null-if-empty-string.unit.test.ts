//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { nullIfEmptyString } from './null-if-empty-string';

describe('nullIfEmptyString', () => {
  it('only works on a string', () => {
    expect(nullIfEmptyString({ foo: 'bar' })).toBeUndefined();
  });

  it('returns string if set', () => {
    expect(nullIfEmptyString('some-string')).toBe('some-string');
  });
  it('returns null if string is empty', () => {
    expect(nullIfEmptyString('')).toBeUndefined();
  });
});
