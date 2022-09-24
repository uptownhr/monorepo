//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { Diff } from './Diff';

export interface RepositoryUpdateResult<T> {
  diffs: Diff[];
  result: T;
}
