import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { CategoryEntity } from './entities';

@ApiTags('Категории')
@Controller('category')
export class CategoryController {
  constructor(@Inject(CategoryService) private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все категории' })
  getAll(): Promise<CategoryDto[]> {
    return this.categoryService.getAll();
  }

  @Get('category_id/:id')
  @ApiOperation({ summary: 'Получить категорию по id' })
  getCategoryByid(@Param() params: { id: string }): Promise<CategoryEntity> {
    return this.categoryService.getCatigoryById(Number(params.id));
  }
}
