import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { CreatePersonDto } from './dto/person.dto';
import { PersonsService } from './persons.service';

@ApiTags('Пользователи')
@Controller('api/users')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  getAll() {
    return this.personsService.getAllPersons();
  }

  @Post()
  @ApiOperation({ summary: 'Добавить пользователя' })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.createPerson(createPersonDto);
  }
}
