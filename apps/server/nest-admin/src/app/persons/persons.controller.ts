import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { CreatePersonDto } from './dto/person.dto';
import { PersonsService } from './persons.service';

/** Контроллер работы с пользователями. */
@ApiTags('Пользователи')
@Controller('api/persons')
export class PersonsController {
  /** Конструктор. */
  constructor(private personsService: PersonsService) {}

  /** Получить всех пользователей. */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  getAll() {
    return this.personsService.getAllPersons();
  }

  /** Добавить нового пользователя. */
  @Post()
  @ApiOperation({ summary: 'Добавить пользователя' })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.createPerson(createPersonDto);
  }
}
