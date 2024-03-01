import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import { UsersController } from '../users.controller';
import { INestApplication } from '@nestjs/common';
import { userRequest, userResponse } from './mocks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';

describe('Users integration Tests', () => {
  let app: INestApplication;

  const usersService = {
    findAll: () => [{ ...userResponse, userId: 1 }],
    create: () => ({ ...userResponse, userId: 1 }),
    findOneByUsername: () => [{ ...userResponse, userId: 1 }],
    findOneByUserId: () => ({ ...userResponse, userId: 1 }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
      ],
    })
      .overrideProvider(UsersController)
      .useValue(UsersController)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST users`, async () => {
    return await request(app.getHttpServer())
      .post('/users')
      .send(userRequest)
      .expect(201)
      .expect(usersService.create());
  });

  it(`/GET users`, async () => {
    return await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersService.findAll());
  });

  it(`/GET users/:username`, async () => {
    return await request(app.getHttpServer())
      .get(`/users/`)
      .send({ username: userRequest.username })
      .expect(200)
      .expect(usersService.findOneByUsername());
  });

  it(`/GET users/:id`, async () => {
    return await request(app.getHttpServer())
      .get(`/users/`)
      .send({ id: userResponse.userId })
      .expect(200)
      .expect(usersService.findOneByUsername());
  });

  afterAll(async () => {
    await app.close();
  });
});
