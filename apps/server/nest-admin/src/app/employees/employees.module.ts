import { CategoryEntity, EmployeeEntity } from '@freeworker/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, CategoriesService],
  imports: [TypeOrmModule.forFeature([EmployeeEntity, CategoryEntity])],
  exports: [EmployeesService],
})
export class EmployeesModule {}
