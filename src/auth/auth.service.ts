import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(data: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const employee = await this.prisma.employee.create({
        data: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          dob: data.dob,
          currentAddress: data.currentAddress,
          permanentAddress: data.permanentAddress,
          maritalStatus: data.maritalStatus,
          bloodGroup: data.bloodGroup,
          physicallyHandicapped: data.physicallyHandicapped,
          nationality: data.nationality,
          role: data.role,
          departmentId: data.departmentId,
          locationId: data.locationId,
        },
      });

      return {
        message: 'Employee registered successfully',
        employee: {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
        },
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async login(data: LoginDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { email: data.email },
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      employee.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: employee.id,
      email: employee.email,
      role: employee.role, 
      departmentId: employee.departmentId,


    };
    

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
      employee: {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      },
    };
  }
}