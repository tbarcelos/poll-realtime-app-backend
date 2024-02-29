import { HttpException, HttpStatus } from '@nestjs/common';

export class PollNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Poll not found', HttpStatus.NOT_FOUND);
  }
}
