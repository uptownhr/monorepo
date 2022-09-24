//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface SendbirdSortedMetadata {
  key: string;
  value: string | number | boolean | Array<string | number | boolean>;
}

export interface SendbirdMetadata {
  [key: string]: string;
}
