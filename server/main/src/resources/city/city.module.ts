import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  providers: [CityService],
  imports: [TypeOrmModule.forFeature([CityEntity])],
  exports: [CityService],
  controllers: [CityController],
})
export class CityModule {}
