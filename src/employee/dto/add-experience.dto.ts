import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddExperienceDto {
  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  role: string;

  @IsNumber()
  years: number;
}