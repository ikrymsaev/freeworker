import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../common/decorators';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }
}
