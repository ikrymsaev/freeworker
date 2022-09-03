import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@ApiTags('Категории')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @ApiOperation({ summary: 'Получить все категории' })
  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }

  @Public()
  @ApiOperation({ summary: 'Получить категорию по id' })
  @Get('/:id')
  getById(@Param() params: { id: string }) {
    return this.categoriesService.getById(Number(params.id));
  }

  @Public()
  @ApiOperation({ summary: 'Добавить категорию' })
  @ApiBody({ type: [CategoryDto] })
  @Post()
  create(@Body() сategoryDto: CategoryDto) {
    return this.categoriesService.create(сategoryDto);
  }
}
