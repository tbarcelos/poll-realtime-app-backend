import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
