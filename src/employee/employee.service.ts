import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.employee.findMany({
      where: { isDeleted: false },
      include: {
        educations: true,
        experiences: true,
        location: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        educations: true,
        experiences: true,
        location: true,
      },
    });
  }

  update(id: number, data: any) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.employee.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async addEducation(employeeId: number, data: any) {
    return this.prisma.education.create({
      data: {
        employeeId,
        degree: data.degree,
        institute: data.institute,
        year: data.year,
      },
    });
  }

  async getEducation(employeeId: number) {
    return this.prisma.education.findMany({
      where: { employeeId },
    });
  }

  async deleteEducation(id: number) {
    return this.prisma.education.delete({
      where: { id },
    });
  }

  async addExperience(employeeId: number, data: any) {
    return this.prisma.experience.create({
      data: {
        employeeId,
        company: data.company,
        role: data.role,
        years: data.years,
      },
    });
  }

  async getExperience(employeeId: number) {
    return this.prisma.experience.findMany({
      where: { employeeId },
    });
  }

  async deleteExperience(id: number) {
    return this.prisma.experience.delete({
      where: { id },
    });
  }


  async getLocations() {
    return this.prisma.location.findMany();
  }

  async searchEmployees(name: string, page = 1, limit = 5) {
  const skip = (page - 1) * limit;

  return this.prisma.employee.findMany({
    where: {
      firstName: {
        contains: name,
        mode: 'insensitive',
      },
    },
    skip,
    take: Number(limit),
  });
}

async getDashboard(user: any) {

  if (user.role === 'ADMIN') {
    const employees = await this.prisma.employee.count();
    const departments = await this.prisma.department.count();

    return {
      role: 'ADMIN',
      totalEmployees: employees,
      totalDepartments: departments,
    };
  }

  if (user.role === 'HR') {
    const employees = await this.prisma.employee.findMany({
      where: {
        departmentId: user.departmentId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return {
      role: 'HR',
      employees,
    };
  }

  return this.prisma.employee.findUnique({
    where: { id: user.sub },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      departmentId: true,
    },
  });
 }

}
