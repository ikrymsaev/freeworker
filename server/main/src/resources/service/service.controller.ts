import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDto } from './dto';

@ApiTags('Услуги')
@Controller('service')
export class ServiceController {
  constructor(@Inject(ServiceService) private serviceService: ServiceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить все услуги' })
  getAll(): Promise<ServiceDto[]> {
    return this.serviceService.getAll();
  }

  @Get('service_id/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить услугу по id' })
  getCategoryByid(@Param() params: { id: string }): Promise<ServiceDto> {
    return this.serviceService.getServiceById(Number(params.id));
  }
}
