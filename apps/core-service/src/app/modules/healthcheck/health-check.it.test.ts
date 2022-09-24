//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../__tests__/test-helper';

describe('HealthCheckController', () => {
  test('works', async () => {
    const { client } = await withApp();
    const response = await client.get('/health-check');
    expect(response.status).toBe(200);
    expect(true).toBe(true);
  });

  test('/health', async () => {
    const { client } = await withApp();
    const response = await client.get('/health');
    expect(response.status).toBe(200);
  });

  test('/ready', async () => {
    const { client } = await withApp();
    const response = await client.get('/ready');
    expect(response.status).toBe(200);
  });
});
