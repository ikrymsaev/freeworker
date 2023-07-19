import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CityEntity } from './entities';
import { CityDto } from './dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly citiesRepository: Repository<CityEntity>
  ) {}

  getAll(): Promise<CityDto[]> {
    return this.citiesRepository.find();
  }

  /** Проверить, если город с таким id. */
  isCityExist(city_id: number): Promise<boolean> {
    return this.citiesRepository.exist({
      where: { city_id },
    });
  }

  async getCityById(city_id: number): Promise<CityDto> {
    const city = await this.citiesRepository.findOne({
      where: { city_id },
    });
    if (!city) throw new ForbiddenException('Города с таким id нет');

    return city;
  }
}
