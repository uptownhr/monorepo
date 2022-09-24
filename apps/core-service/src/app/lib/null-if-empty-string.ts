//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/**
 * Given a type: val: 'a' | 'b' | ''
 *
 * returns 'a' | 'b' | undefined
 * @param val
 * @returns
 */
export function nullIfEmptyString<T>(val?: T): Exclude<T, ''> | undefined {
  if (typeof val === 'string' && val.length > 0) {
    return val as unknown as Exclude<T, ''>;
  } else {
    return undefined;
  }
}
