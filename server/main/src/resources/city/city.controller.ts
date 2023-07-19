import { Public } from '@decorators/index';
import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityDto } from './dto';

@ApiTags('Города')
@Controller('city')
export class CityController {
  constructor(@Inject(CityService) private cityService: CityService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить все города' })
  getAll(): Promise<CityDto[]> {
    return this.cityService.getAll();
  }

  @Public()
  @Get('city_id/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить город по id' })
  getCategoryByid(@Param() params: { id: string }): Promise<CityDto> {
    return this.cityService.getCityById(Number(params.id));
  }
}
