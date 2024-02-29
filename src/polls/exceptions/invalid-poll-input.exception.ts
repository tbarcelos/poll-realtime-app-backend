import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPollInputException extends HttpException {
  constructor(message?: string) {
    super(message || 'Invalid poll input', HttpStatus.BAD_REQUEST);
  }
}
