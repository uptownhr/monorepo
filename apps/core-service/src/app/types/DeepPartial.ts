//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2021,2022
//All Rights Reserved
//=============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
