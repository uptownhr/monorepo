//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export const BASE_URL =
  process.env.APP_ENV === 'production'
    ? 'https://publicapi.bambee.com'
    : `https://publicapi.${process.env.APP_ENV}.bambee.com`;

export function getBaseUrlFor(app = 'publicapi') {
  return process.env.APP_ENV === 'production'
    ? `https://${app}.bambee.com`
    : `https://${app}.${process.env.APP_ENV}.bambee.com`;
}
export const SITE_HOST = process.env.APP_ENV === 'production' ? 'bambee.com' : `${process.env.APP_ENV}.bambee.com`;
