import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const result = await this.usersRepository.find();
    return result;
  }
  async create(userDto: UserDto) {
    const newUser = await this.usersRepository.create(userDto);
    return this.usersRepository.save(newUser);
  }
}
