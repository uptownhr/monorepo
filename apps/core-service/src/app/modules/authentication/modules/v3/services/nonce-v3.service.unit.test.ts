//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import * as HttpErrors from 'http-errors';
import { ObjectId } from 'mongodb';
import { NonceV3Service } from './nonce-v3.service';

describe('NonceV1Service', () => {
  describe('generateNonce()', () => {
    it('fails with an invalid expiration format', async () => {
      const service = new NonceV3Service({} as any, console as any);
      await expect(
        service.generateUserNonce(new ObjectId().toHexString(), new ObjectId().toHexString(), {
          expiration: 'logarithm',
        }),
      ).rejects.toThrow(new HttpErrors[412]('Expiration Format Invalid'));
    });
  });
  describe('verifyNonce()', () => {
    it('fails with a non-uuid nonce', async () => {
      const service = new NonceV3Service({} as any, console as any);
      await expect(service.verifyUserNonce('logarithm')).rejects.toThrowError(new HttpErrors[412]('Nonce Invalid'));
    });
  });
});
