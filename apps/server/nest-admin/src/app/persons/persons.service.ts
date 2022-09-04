import { PersonEntity } from '@freeworker/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/person.dto';

/** Сервис работы с пользователями. */
@Injectable()
export class PersonsService {
  /** Конструктор. */
  constructor(
    @InjectRepository(PersonEntity)
    private personsRepository: Repository<PersonEntity>,
  ) {}
  /** Получить всех пользователей. */
  async getAllPersons(): Promise<PersonEntity[]> {
    return await this.personsRepository.find();
  }
  /** Добавить пользователя. */
  async createPerson(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    return await this.personsRepository.save({...createPersonDto});
  }
}
