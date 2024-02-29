import { HttpException, HttpStatus } from '@nestjs/common';

export class PollDeletionException extends HttpException {
  constructor(message?: string) {
    super(message || 'Failed to delete poll', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
