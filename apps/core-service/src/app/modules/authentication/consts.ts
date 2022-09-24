//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export const COOKIE_PREFIX = process.env.APP_ENV ?? 'local';
export const DEVICEID_COOKIE_KEY = `${COOKIE_PREFIX}-device-id`;
export const REFRESHTOKEN_COOKIE_KEY = `${COOKIE_PREFIX}-refresh-token`;
