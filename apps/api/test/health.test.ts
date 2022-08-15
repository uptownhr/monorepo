import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('health check passes', async () => {
    const response = await request(app.getHttpServer()).get('/health');

    expect(response.body.status).toBe('ok');
  });
});
