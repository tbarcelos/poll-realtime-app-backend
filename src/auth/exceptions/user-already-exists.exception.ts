import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(message?: string) {
    super(message || 'User already exists', HttpStatus.CONFLICT);
  }
}
