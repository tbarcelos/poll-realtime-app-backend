import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PollsModule } from '../polls.module';
import { PollsController } from '../polls.controller';
import { INestApplication } from '@nestjs/common';
import { pollRequest, pollResponse } from './mocks.2e2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from '../entities/poll.entity';
import { Option } from '../entities/option.entity';

describe('Polls integration Tests', () => {
  let app: INestApplication;

  const pollsService = {
    findAll: () => [{ ...pollResponse, id: 1 }],
    create: () => ({ ...pollResponse, id: 1 }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PollsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Poll, Option],
          synchronize: true,
        }),
      ],
    })
      .overrideProvider(PollsController)
      .useValue(PollsController)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST polls`, async () => {
    return await request(app.getHttpServer())
      .post('/polls')
      .send(pollRequest)
      .expect(201)
      .expect(pollsService.create());
  });

  it(`/GET polls`, async () => {
    return await request(app.getHttpServer())
      .get('/polls')
      .expect(200)
      .expect(pollsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
