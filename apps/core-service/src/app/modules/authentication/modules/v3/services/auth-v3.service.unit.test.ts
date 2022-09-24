//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import type { ConfigService } from '@nestjs/config';
import * as HttpErrors from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { createMock } from 'ts-auto-mock';
import { getLogger } from '../../../../../lib/logging';
import { withLogger } from '../../../../../__tests__/test-helper';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { hashString } from '../../../lib/hash-string';
import type { LoginChallengeService } from '../../mfa/services';
import { AuthV3TokenBody } from '../controllers/models/AuthV3TokenBody';
import { AuthV3Service } from './auth-v3.service';
import { TokenV3Service } from './token-v3.service';

describe('AuthService V1', () => {
  const MOCK_CONFIG = createMock<ConfigService>({
    get: (key) =>
      ({
        'authentication.jwt.expiresIn': '10m',
        'authentication.jwt.privateKey': 'test-secret-token',
        'authentication.jwt.publicKey': 'test-secret-token',
        'authentication.refresh.expiresIn': '5m',
        'authentication.refresh.privateKey': 'test-secret-token',
        'authentication.refresh.publicKey': 'test-secret-token',
        'authentication.masquerade.expiresIn': '10m',
        'authentication.masquerade.privateKey': 'masq-secret-token',
        'authentication.masquerade.publicKey': 'masq-secret-token',
        'authentication.internal.publicKey': 'internal-key',
      }[key]),
  });
  const MOCK_MFA_SERVICE = createMock<LoginChallengeService>({
    handleLoginChallenge: () => Promise.resolve(undefined),
  });

  describe('login', () => {
    let request: any;
    let response: any;
    beforeEach(() => {
      request = {};
      response = {
        cookie: jest.fn(),
      };
    });
    it('Fails to login an unknown user', async () => {
      const res = {
        cookie: jest.fn(),
      };
      const mockrepo: any = {
        findByEmail: () => Promise.resolve(null),
      };
      const authService = new AuthV3Service(
        mockrepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      await expect(authService.login(request, response, 'fakeuser', 'fakepass')).rejects.toThrowError(
        new HttpErrors[404]('Invalid User fakeuser'),
      );
    });

    it('Fails to login an an Auth without a password', async () => {
      const mockrepo: any = {
        findByEmail: () =>
          Promise.resolve(
            createMock<AuthUserDTO>({
              active: true,
              currentUserActive: true,
              currentCompanyId: undefined,
              passwordHash: '',
            }),
          ),
      };
      const authService = new AuthV3Service(
        mockrepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      await expect(authService.login(request, response, 'fakeuser', 'fakepass')).rejects.toThrowError(
        new HttpErrors[401]('Auth Record cannot be logged in'),
      );
    });

    it('Fails when with an invalid password', async () => {
      const pwHash = await hashString('fakepass');
      const mockrepo: any = {
        findByEmail: async () =>
          Promise.resolve(
            createMock<AuthUserDTO>({
              id: 'auth-id',
              currentUserActive: true,
              currentCompanyId: undefined,
              email: 'fakeuser',
              passwordHash: pwHash,
              active: true,
            }),
          ),
      };

      const authService = new AuthV3Service(
        mockrepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      await expect(authService.login(request, response, 'fakeuser', 'badpassword')).rejects.toThrowError(
        new HttpErrors[401]('Invalid Password'),
      );
    });

    it('Fails when with an inactive user account', async () => {
      const pwHash = await hashString('realpass');
      const mockrepo: any = {
        findByEmail: async () =>
          Promise.resolve(
            createMock<AuthUserDTO>({
              id: 'auth-id',
              currentUserActive: false,
              currentCompanyId: undefined,
              email: 'fakeuser',
              passwordHash: pwHash,
              active: true,
            }),
          ),
      };
      const authService = new AuthV3Service(
        mockrepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      await expect(authService.login(request, response, 'fakeuser', 'realpass')).rejects.toThrowError(
        new HttpErrors[403]('Account is Inactive'),
      );
    });

    it('Successfully logs in', async () => {
      const pwHash = await hashString('realpass');
      const mockrepo: any = {
        findByEmail: async () =>
          Promise.resolve({
            id: 'auth-id',
            currentUserId: 'user-id',
            fullName: 'test account',
            avatarUrl: 'null',
            currentCompanyId: undefined,
            email: 'fakeuser',
            passwordHash: pwHash,
            active: true,
            currentUserActive: true,
          }),
      };

      const authService = new AuthV3Service(
        mockrepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      await expect(authService.login(request, response, 'fakeuser', 'realpass')).resolves.toBeInstanceOf(
        AuthV3TokenBody,
      );
      expect(response.cookie).toBeCalled();
      expect(response.cookie.mock.calls[0][0]).toBe('local-refresh-token');
      expect(response.cookie.mock.calls[1][0]).toBe('local-device-id');
    });
  });

  describe('refresh', () => {
    let authData: any;
    let request;
    let response;
    let passwordHash;
    beforeEach(async () => {
      request = {}; //createMock<express.Request>();
      response = {
        //createMock<express.Response>({
        cookie: jest.fn(),
      };
      passwordHash = await hashString('realpass');
    });

    const AUTH_GETTER = async () =>
      Promise.resolve({
        active: true,
        currentUserActive: true,
        currentCompanyId: undefined,
        fullName: 'test account',
        avatarUrl: 'null',
        primaryRole: 'employee',
        roles: ['employee'],
        currentUserId: 'user-id',
        email: 'fakeuser',
        passwordHash,
        id: 'auth-id',
        userOptions: [],
      });

    const authRepo: any = {
      findByAuthId: AUTH_GETTER,
      findByEmail: AUTH_GETTER,
      findByUserId: AUTH_GETTER,
      findByUsername: AUTH_GETTER,
    };

    async function performLogin() {
      const authService = new AuthV3Service(
        authRepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      const loginResponse = (await authService.login(request, response, 'fakeuser', 'realpass')) as AuthV3TokenBody;
      const refreshtoken: string = response.cookie.mock.calls[0][1];
      const deviceid: string = response.cookie.mock.calls[1][1];

      return { loginResponse, refreshtoken, deviceid, authService };
    }

    it('Refreshes with a new access_token', async () => {
      const { loginResponse, refreshtoken, deviceid } = await performLogin();

      /**
       * JWT expiration uses seconds, not milliseconds, and this test runs in under 90ms.  Therefore, we need
       * a new TokenService with a different expiration to force the generation of a different access token.
       */
      const secondTokenService = new TokenV3Service(
        {
          get: (key) =>
            ({
              'authentication.jwt.expiresIn': '5m',
              'authentication.jwt.privateKey': 'test-secret-token',
              'authentication.jwt.publicKey': 'test-secret-token',
              'authentication.refresh.expiresIn': '1h',
              'authentication.refresh.privateKey': 'test-secret-token',
              'authentication.refresh.publicKey': 'test-secret-token',
              'authentication.internal.publicKey': 'internal-key',
              'authentication.masquerade.expiresIn': '10m',
              'authentication.masquerade.privateKey': 'masq-secret-token',
              'authentication.masquerade.publicKey': 'masq-secret-token',
            }[key]),
        } as any,
        withLogger(),
      );

      const secondAuthService = new AuthV3Service(authRepo, secondTokenService, MOCK_MFA_SERVICE, getLogger());

      const refreshResponse = await secondAuthService.refresh(
        {
          signedCookies: { refreshtoken, deviceid },
          headers: { authorization: `Bearer ${loginResponse.accessToken}` },
        } as any,
        response,
      );
      expect(refreshResponse).toBeInstanceOf(AuthV3TokenBody);
      expect(refreshResponse.accessToken).not.toBe(loginResponse.accessToken);
    });

    it('Fails to refresh when the secret key changes', async () => {
      const { refreshtoken, deviceid, loginResponse } = await performLogin();

      /**
       * JWT expiration uses seconds, not milliseconds, and this test runs in under 90ms.  Therefore, we need
       * a new TokenService with a different expiration to force the generation of a different access token.
       */
      const secondTokenService = new TokenV3Service(
        {
          get: (key) =>
            ({
              'authentication.jwt.expiresIn': '5m',
              'authentication.jwt.privateKey': 'different-secret',
              'authentication.jwt.publicKey': 'different-secret',
              'authentication.refresh.expiresIn': '1h',
              'authentication.refresh.privateKey': 'different-secret-secret-token',
              'authentication.refresh.publicKey': 'different-secret-secret-token',
              'authentication.internal.publicKey': 'internal-key',
              'authentication.masquerade.expiresIn': '10m',
              'authentication.masquerade.privateKey': 'masq-different-token',
              'authentication.masquerade.publicKey': 'masq-different-token',
            }[key]),
        } as any,
        withLogger(),
      );

      const secondAuthService = new AuthV3Service(authRepo, secondTokenService, MOCK_MFA_SERVICE, getLogger());

      await expect(
        secondAuthService.refresh(
          {
            signedCookies: { refreshtoken, deviceid },
            headers: { authorization: `Bearer ${loginResponse.accessToken}` },
          } as any,
          response,
        ),
      ).rejects.toThrowError(new HttpErrors[401]('Token Verification Failed'));
    });

    it('Fails without a refresh token', async () => {
      const secondAuthService = new AuthV3Service(
        authRepo,
        new TokenV3Service(MOCK_CONFIG, withLogger()),
        MOCK_MFA_SERVICE,
        getLogger(),
      );

      await expect(secondAuthService.refresh({ signedCookies: {} } as any, response)).rejects.toThrowError(
        new HttpErrors[401]('Missing Refresh Token'),
      );
    });

    it('Fails without a deviceid cookie', async () => {
      const { refreshtoken } = await performLogin();

      /**
       * JWT expiration uses seconds, not milliseconds, and this test runs in under 90ms.  Therefore, we need
       * a new TokenService with a different expiration to force the generation of a different access token.
       */
      const secondTokenService = new TokenV3Service(MOCK_CONFIG, withLogger());

      const secondAuthService = new AuthV3Service(authRepo, secondTokenService, MOCK_MFA_SERVICE, getLogger());

      await expect(
        secondAuthService.refresh({ signedCookies: { refreshtoken } } as any, response),
      ).rejects.toThrowError(new HttpErrors[401]('Missing Device ID'));
    });

    it('Fails with a malformed token', async () => {
      const { deviceid, loginResponse } = await performLogin();

      const secondTokenService = new TokenV3Service(
        {
          get: (key) =>
            ({
              'authentication.jwt.expiresIn': '5m',
              'authentication.jwt.privateKey': 'different-secret',
              'authentication.jwt.publicKey': 'different-secret',
              'authentication.refresh.expiresIn': '1h',
              'authentication.refresh.privateKey': 'test-secret-token',
              'authentication.refresh.publicKey': 'test-secret-token',
              'authentication.internal.publicKey': 'internal-key',
              'authentication.masquerade.expiresIn': '10m',
              'authentication.masquerade.privateKey': 'masq-different-token',
              'authentication.masquerade.publicKey': 'masq-different-token',
            }[key]),
        } as any,
        withLogger(),
      );

      const secondAuthService = new AuthV3Service(authRepo, secondTokenService, MOCK_MFA_SERVICE, getLogger());

      await expect(
        secondAuthService.refresh(
          {
            signedCookies: {
              deviceid,
              refreshtoken: jwt.sign({ foo: 'bar' }, 'different-secret'),
            },
            headers: { authorization: `Bearer ${loginResponse.accessToken}` },
          } as any,
          response,
        ),
      ).rejects.toThrowError(new HttpErrors[401]('Invalid Claim'));
    });
  });
});
