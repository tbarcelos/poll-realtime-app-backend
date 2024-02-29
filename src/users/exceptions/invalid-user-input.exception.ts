import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUserInputException extends HttpException {
  constructor(message?: string) {
    super(message || 'Invalid user input', HttpStatus.BAD_REQUEST);
  }
}
