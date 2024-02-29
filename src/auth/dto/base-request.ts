import { IsNotEmpty, IsString } from 'class-validator';

export class BaseRequest {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
