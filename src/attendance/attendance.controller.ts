import { Controller, Post, Param, Get, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('checkin/:employeeId')
  checkIn(@Param('employeeId') id: string) {
    return this.attendanceService.checkIn(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout/:attendanceId')
  checkOut(@Param('attendanceId') id: string) {
    return this.attendanceService.checkOut(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('employee/:employeeId')
  getEmployeeAttendance(@Param('employeeId') id: string) {
    return this.attendanceService.getEmployeeAttendance(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.attendanceService.getAllAttendance();
  }
}