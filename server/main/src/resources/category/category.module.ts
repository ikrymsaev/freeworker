import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './entities';

@Module({
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
})
export class CategoryModule {}
