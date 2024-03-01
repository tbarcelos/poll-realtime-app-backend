import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthModule } from '../auth.module';
import { AuthController } from '../auth.controller';

import { loginResponse, userRequest, userResponse } from './mocks';

import { User } from '../../users/user.entity';

describe('Auth integration Tests', () => {
  let app: INestApplication;

  const authService = {
    signIn: () => ({ accessToken: loginResponse.accessToken }),
    signUp: () => ({ accessToken: loginResponse.accessToken }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
      ],
    })
      .overrideProvider(AuthController)
      .useValue(AuthController)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST register`, async () => {
    return await request(app.getHttpServer())
      .post('/auth/register')
      .send(userRequest);
  });

  it(`/POST login`, async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send(userRequest)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
