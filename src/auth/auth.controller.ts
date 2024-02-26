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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginRequest: LoginRequest) {
    return this.authService.signIn(
      loginRequest.username,
      loginRequest.password,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() registerRequest: RegisterRequest) {
    return this.authService.signUp(
      registerRequest.username,
      registerRequest.password,
    );
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
