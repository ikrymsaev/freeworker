import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterEntity } from '../../entities/masters.entity';
import { CategoriesService } from '../categories/categories.service';
import { CreateMasterDto } from './dto/master.dto';

@Injectable()
export class MastersService {
  constructor(
    @InjectRepository(MasterEntity)
    private mastersRepository: Repository<MasterEntity>,
    private categoriesService: CategoriesService,
  ) {}

  async getAll(): Promise<MasterEntity[]> {
    const result = await this.mastersRepository.find();
    return result;
  }

  async getById(id: number): Promise<MasterEntity> {
    const result = await this.mastersRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    return result;
  }

  async create(createMasterDto: CreateMasterDto): Promise<MasterEntity> {
    const master = this.mastersRepository.create(createMasterDto);
    const category = await this.categoriesService.getById(createMasterDto.categoryId);
    master.category = category;

    return this.mastersRepository.save(master);
  }
}
