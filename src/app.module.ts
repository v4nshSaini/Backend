import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [PrismaModule, EmployeeModule, AuthModule, AttendanceModule, DepartmentModule],
})
export class AppModule {}