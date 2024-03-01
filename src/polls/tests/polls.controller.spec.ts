import { Test, TestingModule } from '@nestjs/testing';
import { PollsController } from '../polls.controller';
import { PollsService } from '../polls.service';
import { pollRequest, pollResponse } from './mocks.unit';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Poll } from '../entities/poll.entity';
import { Option } from '../entities/option.entity';
import { PollsGateway } from '../polls.gateway';

describe('UsersController', () => {
  let pollsController: PollsController;
  let pollsService: PollsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PollsController],
      providers: [
        PollsService,
        {
          provide: getRepositoryToken(Poll),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Option),
          useValue: {},
        },
        PollsGateway,
      ],
    }).compile();

    pollsService = moduleRef.get<PollsService>(PollsService);
    pollsController = moduleRef.get<PollsController>(PollsController);
  });

  describe('create', () => {
    it('should create a poll', async () => {
      jest
        .spyOn(pollsService, 'create')
        .mockResolvedValue(Promise.resolve(pollResponse));

      expect(await pollsController.create(pollRequest)).toEqual(pollResponse);
      expect(pollsService.create).toHaveBeenCalledWith(pollRequest);
    });
  });

  describe('findAll', () => {
    it('should find all polls', async () => {
      jest
        .spyOn(pollsService, 'findAll')
        .mockImplementation(() => Promise.resolve([pollResponse]));

      expect(await pollsController.findAll()).toEqual([pollResponse]);
      expect(pollsService.findAll).toHaveBeenCalled();
    });
  });
});
