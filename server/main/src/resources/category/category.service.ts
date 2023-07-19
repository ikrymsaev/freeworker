import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>
  ) {}

  async getAll(): Promise<CategoryDto[]> {
    return this.categoriesRepository.find();
  }

  async getCatigoryById(category_id: number): Promise<CategoryDto> {
    const category = await this.categoriesRepository.findOne({
      where: { category_id },
    });
    if (!category) throw new ForbiddenException('Категории с таким id нет');

    return category;
  }
}
