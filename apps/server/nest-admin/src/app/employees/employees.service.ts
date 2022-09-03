import { EmployeeEntity } from '@freeworker/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
  ) {}

  async getAll(): Promise<EmployeeEntity[]> {
    const result = await this.employeesRepository.find();
    return result;
  }

  async getById(id: number): Promise<EmployeeEntity> {
    const result = await this.employeesRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    return result;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    return createEmployeeDto;
  }
}
