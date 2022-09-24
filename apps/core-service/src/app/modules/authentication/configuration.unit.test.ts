//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { validate } from './configuration';

describe('Auth Module Configuration', () => {
  it('works with everything', () => {
    expect(() =>
      validate({
        internal: {
          privateKey: 'internal-private-key',
          publicKey: 'internal-public-key',
          expiresIn: '20s',
        },
        jwt: {
          privateKey: 'jwt-private-key',
          publicKey: 'jwt-public-key',
          expiresIn: '5m',
        },
        refresh: {
          privateKey: 'refresh-private-key',
          publicKey: 'refresh-public-key',
          expiresIn: '30d',
        },
        masquerade: {
          privateKey: 'masquerade-private-key',
          publicKey: 'masquerade-public-key',
          expiresIn: '5m',
        },

        sso: {
          bambeeClub: {
            publicKey: 'sso-bambeeclub-public-key',
          },

          'simply-insured': {
            publicKey: 'sso-simplyinsured-public-key',
          },
        },
      }),
    ).not.toThrow();
  });

  it('works without SSO configuration', () => {
    expect(() =>
      validate({
        internal: {
          privateKey: 'internal-private-key',
          publicKey: 'internal-public-key',
          expiresIn: '20s',
        },
        jwt: {
          privateKey: 'jwt-private-key',
          publicKey: 'jwt-public-key',
          expiresIn: '5m',
        },
        refresh: {
          privateKey: 'refresh-private-key',
          publicKey: 'refresh-public-key',
          expiresIn: '30d',
        },
        masquerade: {
          privateKey: 'masquerade-private-key',
          publicKey: 'masquerade-public-key',
          expiresIn: '5m',
        },
      }),
    ).not.toThrow();
  });

  it('fails when missing JWT configuration', () => {
    expect(() =>
      validate({
        internal: {
          privateKey: 'internal-private-key',
          publicKey: 'internal-public-key',
          expiresIn: '20s',
        },
        jwt: {
          privateKey: undefined,
          publicKey: 'jwt-public-key',
          expiresIn: '5m',
        },
        refresh: {
          privateKey: 'refresh-private-key',
          publicKey: 'refresh-public-key',
          expiresIn: '30d',
        },
        masquerade: {
          privateKey: 'masquerade-private-key',
          publicKey: 'masquerade-public-key',
          expiresIn: '5m',
        },
        sso: {
          bambeeClub: {
            publicKey: 'sso-bambeeclub-public-key',
          },
          'simply-insured': {
            publicKey: 'sso-simplyinsured-public-key',
          },
        },
      }),
    ).toThrow();
  });
});
