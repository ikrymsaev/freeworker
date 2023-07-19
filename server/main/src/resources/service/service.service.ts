import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ServiceEntity } from './entities';
import { ServiceDto } from './dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>
  ) {}

  async getAll(): Promise<ServiceDto[]> {
    return this.serviceRepository.find();
  }

  async getServiceById(service_id: number): Promise<ServiceDto> {
    const service = await this.serviceRepository.findOne({
      where: { service_id },
    });
    if (!service) throw new ForbiddenException('Услуги с таким id нет');

    return service;
  }
}
