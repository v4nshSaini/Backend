import { IsNumber } from 'class-validator';

export class CheckInDto {
  @IsNumber()
  employeeId: number;
}