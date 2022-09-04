import { PersonEntity } from '@freeworker/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

/** Модуль работы с пользователями. */
@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  exports: [PersonsService],
})
export class PersonsModule {}
