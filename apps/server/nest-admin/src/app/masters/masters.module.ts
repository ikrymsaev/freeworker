import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { MasterEntity } from '../../entities/masters.entity';
import { CategoriesService } from '../categories/categories.service';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';

@Module({
  controllers: [MastersController],
  providers: [MastersService, CategoriesService],
  imports: [TypeOrmModule.forFeature([MasterEntity, CategoryEntity])],
  exports: [MastersService],
})
export class MastersModule {}
