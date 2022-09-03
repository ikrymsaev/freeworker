import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { CreateMasterDto } from './dto/master.dto';
import { MastersService } from './masters.service';

@ApiTags('Мастера')
@Controller('api/masters')
export class MastersController {
  constructor(private mastersService: MastersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить всех мастеров' })
  getAll() {
    return this.mastersService.getAll();
  }

  @Public()
  @ApiOperation({ summary: 'Получить мастера по id' })
  @Get('/:id')
  getById(@Param() params: { id: string }) {
    return this.mastersService.getById(Number(params.id));
  }

  @Public()
  @ApiOperation({ summary: 'Добавить мастера' })
  @ApiBody({ type: [CreateMasterDto] })
  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }
}
