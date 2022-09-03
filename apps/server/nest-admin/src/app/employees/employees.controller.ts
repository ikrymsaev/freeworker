import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { CreateEmployeeDto } from './dto/employee.dto';
import { EmployeesService } from './employees.service';

@ApiTags('Мастера')
@Controller('api/masters')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить всех мастеров' })
  getAll() {
    return this.employeesService.getAll();
  }

  @Public()
  @ApiOperation({ summary: 'Получить мастера по id' })
  @Get('/:id')
  getById(@Param() params: { id: string }) {
    return this.employeesService.getById(Number(params.id));
  }

  @Public()
  @ApiOperation({ summary: 'Добавить мастера' })
  @ApiBody({ type: [CreateEmployeeDto] })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }
}
