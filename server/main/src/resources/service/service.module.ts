import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  providers: [ServiceService],
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [ServiceController],
})
export class ServiceModule {}
