//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { mock } from 'jest-mock-extended';
import { createMock } from 'ts-auto-mock';
import { CoreAuthByIdLoader } from '../dataloaders';
import type { CoreAuthDTO } from '../dto';
import type { CoreAuthRepository } from '../repositories';
import { CoreAuthService } from './core-auth.service';

describe('core-auth.service', () => {
  const authRepo = mock<CoreAuthRepository>();
  const authLoader = new CoreAuthByIdLoader(authRepo);
  const service = new CoreAuthService(authLoader);

  describe('getAuth()', () => {
    it('invokes authByIdLoader once', async () => {
      const id = 'test';
      const authMock = [createMock<CoreAuthDTO>({ id })];

      authRepo.getByIds.mockResolvedValueOnce(authMock);

      const spyGetById = jest.spyOn(authRepo, 'getByIds');

      const authModel = await service.getAuth(id);

      expect(spyGetById).toHaveBeenCalled();
      expect(authModel).toBeTruthy();
    });

    /*it('uses the dataloader to ensure only one call', async () => {
      const MOCK = {
        getByIds: (ids) =>
          Promise.resolve(
            ids.map((id) => ({
              id,
              username: `mock-username-${id}`,
              email: `mock-email-${id}`,
            })),
          ),
      };
      const spy = jest.spyOn(MOCK, 'getByIds');
      const service = new CoreAuthService(MOCK as any);
      const res1 = await service.getAuth('1');
      const res2 = await service.getAuth('1');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(res1).toEqual(res2);
    });*/
  });
});
