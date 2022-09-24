//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../../__tests__/test-helper';
import type supertest = require('supertest');

describe('Openid V1 Controller', () => {
  let client: supertest.SuperTest<supertest.Test>;
  beforeEach(async function () {
    ({ client } = await withApp());
  });
  describe('/redirect', () => {
    it('succeeds with a known provider', async () => {
      const response = await client.get('/auth/v1/openid/bambee-gsuite/redirect');
      expect(response.status).toBe(302);
    });
    it('failes with an unsupported provider', async () => {
      const response = await client.get('/auth/v1/openid/fake/redirect');
      expect(response.status).toBe(404);
    });
  });
});
