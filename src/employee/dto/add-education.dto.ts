import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddEducationDto {
  @IsNotEmpty()
  degree: string;

  @IsNotEmpty()
  institute: string;

  @IsNumber()
  year: number;
}