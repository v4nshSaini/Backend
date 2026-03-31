import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(employeeId: number) {
    return this.prisma.attendance.create({
      data: {
        employeeId,
        checkIn: new Date(),
      },
    });
  }

  async checkOut(attendanceId: number) {
    return this.prisma.attendance.update({
      where: { id: attendanceId },
      data: {
        checkOut: new Date(),
      },
    });
  }

  async getEmployeeAttendance(employeeId: number) {
    return this.prisma.attendance.findMany({
      where: { employeeId },
      orderBy: { date: 'desc' },
    });
  }

  async getAllAttendance() {
    return this.prisma.attendance.findMany({
      include: {
        employee: true,
      },
      orderBy: { date: 'desc' },
    });
  }
}