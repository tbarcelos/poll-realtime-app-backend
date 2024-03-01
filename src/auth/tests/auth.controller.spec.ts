import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import {
  loginRequest,
  loginResponse,
  userRequest,
  userResponse,
} from './mocks';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { CreateUserDto } from '../../users/dto/create-user.dto';
import { BCRYPT_ADAPTER_INTERFACE } from '../constants';
// import { BcryptAdapterInterface } from '@/utils/bcrypt-adapter';
// import { BcryptAdapterInterface } from '../../utils/bcrypt-adapter';

describe('UsersController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: BCRYPT_ADAPTER_INTERFACE,
          useValue: {},
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should login a user', async () => {
      jest.spyOn(authService, 'signIn').mockResolvedValue(loginResponse);

      expect(await authController.signIn(loginRequest)).toEqual(loginResponse);
      expect(authService.signIn).toHaveBeenCalledWith(
        loginRequest.username,
        loginRequest.password,
      );
    });
  });

  describe('register', () => {
    it('should register a user', async () => {
      jest.spyOn(authService, 'signUp').mockResolvedValue(userResponse);

      expect(await authController.signUp(userRequest)).toEqual(userResponse);
      expect(authService.signUp).toHaveBeenCalledWith(
        userRequest.username,
        userRequest.password,
      );
    });
  });
});
