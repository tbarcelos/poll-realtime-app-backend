import { IsNotEmpty } from 'class-validator';

export class CreatePollDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  options: string[];
}
