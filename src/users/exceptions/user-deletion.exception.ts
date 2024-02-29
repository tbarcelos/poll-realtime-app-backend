import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDeletionException extends HttpException {
  constructor(message?: string) {
    super(message || 'Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
