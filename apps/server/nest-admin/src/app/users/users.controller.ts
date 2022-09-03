import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Добавить пользователя' })
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }
}
