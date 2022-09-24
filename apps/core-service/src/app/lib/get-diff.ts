//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as flat from 'flat';
import { omit } from 'lodash';
import type { Document, DocumentDefinition } from 'mongoose';
import type { Diff } from '../types';

/**
 * Because some frontends send unserialized mongoose objects back and forth
 * @param obj
 */
function omitMongoose(obj: any) {
  return omit(obj, '_id', '__v', 'isNew', 'schema', '$locals');
}
export default function getDiff<T extends Document>(
  source: T,
  update: T | Partial<DocumentDefinition<T>>,
  prefix?: string,
): Diff[] {
  const flattenedUpdate: { [key: string]: any } = flat(omitMongoose('toObject' in update ? update.toObject() : update));
  const flattenedSource: { [key: string]: any } = flat(omitMongoose('toObject' in source ? source.toObject() : source));

  const result: Diff[] = [];
  for (const key in flattenedUpdate) {
    const oldValue = flattenedSource[key]?.toString() ?? '';
    const newValue = flattenedUpdate[key]?.toString() ?? '';
    // To be quadroupley sure
    if (key.includes('password')) {
      continue;
    } else if (oldValue !== newValue) {
      result.push({
        path: (prefix ? `${prefix}.` : '') + key,
        oldValue,
        newValue,
      });
    }
  }
  return result;
}
