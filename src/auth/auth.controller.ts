import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginRequest } from './dto/login-request';
import { RegisterRequest } from './dto/register-request';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginRequest: LoginRequest) {
    try {
      const user = await this.authService.signIn(
        loginRequest.username,
        loginRequest.password,
      );
      return user;
    } catch (error) {
      throw new InvalidCredentialsException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  async signUp(@Body() registerRequest: RegisterRequest) {
    try {
      return await this.authService.signUp(
        registerRequest.username,
        registerRequest.password,
      );
    } catch (error) {
      throw new UserAlreadyExistsException();
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
