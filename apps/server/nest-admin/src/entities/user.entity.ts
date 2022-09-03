import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ unique: true })
  email: string;
  @ApiProperty({ example: '12345qwerty', description: 'Пароль' })
  @Column()
  password: string;
  @ApiProperty({ example: 'pussyDestroyer666', description: 'Никнейм' })
  @Column({ unique: true })
  nickname: string;
  @ApiProperty({ example: 'Василий Пупкин', description: 'Имя' })
  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'токен' })
  @Column({ nullable: true })
  hash: string;

  @ApiProperty({ description: 'рефреш токен' })
  @Column({ nullable: true })
  hashedRt: string | null;
}
