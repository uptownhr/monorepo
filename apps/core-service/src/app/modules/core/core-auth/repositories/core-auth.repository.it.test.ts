//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { INestApplication } from '@nestjs/common';
import { withApp } from '../../../../__tests__/test-helper';
import { withCustomer } from '../../../../__tests__/with-user';
import type { CoreAuthDTO } from '../dto/core-auth.dto';
import { CoreAuthRepository } from './core-auth.repository';

describe('core-auth.respository', () => {
  let app: INestApplication;
  let authRepo: CoreAuthRepository;

  beforeAll(async () => {
    ({ app } = await withApp());
    authRepo = await app.resolve(CoreAuthRepository);
  });

  it('getById()', async () => {
    const customer = await withCustomer();
    const dtoResult: CoreAuthDTO = {
      id: customer.auth._id.toString(),
      username: customer.auth.username,
      email: customer.auth.email,
    };
    const result = await authRepo.getById(customer.auth._id.toString());
    expect(result).toMatchObject(dtoResult);
  });

  it('getByUserId()', async () => {
    const customer = await withCustomer();
    const dtoResult: CoreAuthDTO = {
      id: customer.auth._id.toString(),
      username: customer.auth.username,
      email: customer.auth.email,
    };
    const result = await authRepo.getByUserId(customer.user._id.toString());
    expect(result).toMatchObject(dtoResult);
  });

  it('setTosAccepted()', async () => {
    const testDate = new Date();
    const customer = await withCustomer();
    const result1 = await authRepo.getById(customer.auth._id.toString());
    expect(result1?.tosAcceptedAt).toBeNull();
    await authRepo.setTosAccepted(customer.auth._id.toString());
    const result2 = await authRepo.getById(customer.auth._id.toString());
    expect(result2?.tosAcceptedAt).toBeDefined();
    expect(result2?.tosAcceptedAt?.getTime()).toBeGreaterThan(testDate.getTime());
  });
});
