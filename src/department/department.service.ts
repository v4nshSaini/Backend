import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.department.create({ data });
  }

  findAll() {
    return this.prisma.department.findMany();
  }

  async getDepartmentStats(id: string) {
  const deptId = Number(id);

const department = await this.prisma.department.findUnique({
  where: { id: deptId },
  include: {
    employees: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true
      }
    },
    manager: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    }
  }
});

  if (!department) {
    throw new Error('Department not found');
  }

  const totalEmployees = department.employees.length;
  const activeEmployees = department.employees.filter(e => e.status).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  return {
    id: department.id,
    name: department.name,
    manager: department.manager,
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
  };
}
  findOne(id: string) {
    return this.prisma.department.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: string, data: any) {
    return this.prisma.department.update({
      where: { id: Number(id) },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.department.delete({
      where: { id: Number(id) },
    });
  }

async assignEmployee(deptId: string, employeeId: number) {
  const employee = await this.prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    throw new BadRequestException('Employee not found');
  }

  return this.prisma.employee.update({
    where: { id: employeeId },
    data: {
      departmentId: Number(deptId),
    },
  });
}

getEmployees(deptId: string) {
  return this.prisma.department.findUnique({
    where: { id: Number(deptId) },
    include: {
      employees: true,
    },
  });
 }

async assignManager(id: string, employeeId: number) {
  try {
    const deptId = Number(id);

    const department = await this.prisma.department.findUnique({
      where: { id: deptId },
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new BadRequestException('Employee not found');
    }

    const existingManager = await this.prisma.department.findFirst({
      where: { managerId: employeeId },
    });

    if (existingManager) {
      throw new BadRequestException('Employee already assigned as manager');
    }

    return await this.prisma.department.update({
      where: { id: deptId },
      data: {
        managerId: employeeId,
      },
    });

  } catch (error) {
    console.log("REAL ERROR:", error);
    throw error;
  }

}getFullDetails(id: string) {
  return this.prisma.department.findUnique({
    where: { id: Number(id) },
    include: {
      employees: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          departmentId: true,
        },
      },
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
}
}
