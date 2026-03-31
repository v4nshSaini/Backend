import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  middleName?: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

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