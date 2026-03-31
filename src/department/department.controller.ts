import { CreateDepartmentDto } from './dto/create-department.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DepartmentService } from './department.service';


@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

@Post()
async create(@Body() body: CreateDepartmentDto) {
  try {
    return await this.service.create(body);
  } catch (error) {
    console.log("ERROR:", error);   
    throw error;
  }
}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Put(':id/assign-employee')
assignEmployee(
  @Param('id') id: string,
  @Body('employeeId') employeeId: number,
) {
  return this.service.assignEmployee(id, employeeId);
 }

 @Get(':id/employees')
getEmployees(@Param('id') id: string) {
  return this.service.getEmployees(id);
 }

 @Put(':id/assign-manager')
assignManager(
  @Param('id') id: string,
  @Body('employeeId') employeeId: number,
) {
  return this.service.assignManager(id, employeeId);
 }

 @Get(':id/full')
getFull(@Param('id') id: string) {
  return this.service.getFullDetails(id);
 }

 @Get(':id/stats')
getStats(@Param('id') id: string) {
  return this.service.getDepartmentStats(id);
}

}