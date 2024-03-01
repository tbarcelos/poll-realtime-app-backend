import {
  Inject,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BCRYPT_ADAPTER_INTERFACE, jwtConstants } from './constants';
import { BcryptAdapterInterface } from '../utils/bcrypt-adapter';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(BCRYPT_ADAPTER_INTERFACE)
    private readonly bcryptAdapter: BcryptAdapterInterface,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) throw new UnauthorizedException();

    const passwordIsValid = await this.bcryptAdapter.comparePassword(
      pass,
      user.password,
    );

    if (!passwordIsValid) throw new UnauthorizedException();

    const payload = { username: user.username, userId: user.userId };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, pass: string): Promise<any> {
    const createUserDto = new CreateUserDto();
    createUserDto.username = username;
    createUserDto.password = await this.bcryptAdapter.generatePassword(pass);

    const emailUsed = await this.usersService.findOneByUsername(
      createUserDto.username,
    );
    if (emailUsed) {
      throw new BadRequestException({ message: 'The username already used!' });
    }

    const user = await this.usersService.create(createUserDto);
    if (!user) throw new BadRequestException();

    const payload = { username: user.username, userId: user.userId };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });
    } catch {
      return false;
    }
    return true;
  }
}
