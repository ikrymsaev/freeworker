import { CategoryEntity } from '@freeworker/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async getAll() {
    const result = await this.categoriesRepository.find({
      relations: {
        employees: true,
      },
    });
    return result;
  }

  async getById(id: number) {
    const result = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        employees: true,
      },
    });
    return result;
  }

  async create(categoryDto: CategoryDto) {
    const category = this.categoriesRepository.create(categoryDto);
    return this.categoriesRepository.save(category);
  }
}
