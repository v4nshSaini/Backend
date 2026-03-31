import { IsNotEmpty, IsOptional, IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  dob?: Date;

  @IsOptional()
  currentAddress?: string;

  @IsOptional()
  permanentAddress?: string;

  @IsOptional()
  maritalStatus?: string;

  @IsOptional()
  bloodGroup?: string;

  @IsOptional()
  physicallyHandicapped?: boolean;

  @IsOptional()
  nationality?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  departmentId?: number;

  @IsOptional()
  locationId?: number;

}