import { IsNotEmpty } from 'class-validator';

export class BaseRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
