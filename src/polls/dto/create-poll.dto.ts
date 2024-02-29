import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePollDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  options: string[];
}
