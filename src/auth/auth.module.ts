import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants, BCRYPT_ADAPTER_INTERFACE } from './constants';
import { BcryptAdapter } from '../utils/bcrypt-adapter';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: BCRYPT_ADAPTER_INTERFACE,
      useFactory: () => new BcryptAdapter(10),
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
