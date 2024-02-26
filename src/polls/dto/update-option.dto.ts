import { IsNumber } from 'class-validator';

export class UpdateOptionDto {
  @IsNumber()
  optionId: number;
  @IsNumber()
  pollId: number;
}
