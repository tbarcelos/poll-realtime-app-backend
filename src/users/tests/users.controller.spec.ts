import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userRequest, userResponse } from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(userResponse);

      expect(await usersController.create(userRequest)).toEqual(userResponse);
      expect(usersService.create).toHaveBeenCalledWith(userRequest);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(() => Promise.resolve([userResponse]));

      expect(await usersController.findAll()).toEqual([userResponse]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneByUserId', () => {
    it('should find a user by id', async () => {
      const userId = userResponse.userId;
      jest
        .spyOn(usersService, 'findOneByUserId')
        .mockResolvedValue(userResponse);

      expect(await usersController.findOneByUserId(userId)).toEqual(
        userResponse,
      );
      expect(usersService.findOneByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOneByUsername', () => {
    it('should find a user by username', async () => {
      const username = userResponse.username;
      jest
        .spyOn(usersService, 'findOneByUsername')
        .mockResolvedValue(userResponse);

      expect(await usersController.findOneByUsername(username)).toEqual(
        userResponse,
      );
      expect(usersService.findOneByUsername).toHaveBeenCalledWith(username);
    });
  });
});
