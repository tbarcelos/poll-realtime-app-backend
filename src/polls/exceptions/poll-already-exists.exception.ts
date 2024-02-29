import { HttpException, HttpStatus } from '@nestjs/common';

export class PollAlreadyExistsException extends HttpException {
  constructor(message?: string) {
    super(message || 'Poll already exists', HttpStatus.CONFLICT);
  }
}
