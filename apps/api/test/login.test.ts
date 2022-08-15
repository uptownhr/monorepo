import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

describe('login', () => {
  it('should be able to login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'asdfasdf1234',
      })
      .expect(201);

    expect(response.body.token).toBeTruthy();
  });
});

afterAll(async () => {
  await app.close();
});
