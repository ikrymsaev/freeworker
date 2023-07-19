import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities';
import { CityModule } from '@resources/city';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity]), CityModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
