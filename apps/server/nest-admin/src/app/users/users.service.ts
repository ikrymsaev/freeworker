import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
