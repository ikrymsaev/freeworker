import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('persons')
export class PersonEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Петров', description: 'Фамилия' })
  lastName: string;

  @ApiProperty({ example: 'pussyDestroyer666', description: 'Логин' })
  @Column({ unique: true })
  login: string;

  @ApiProperty({ example: 'pussyDestroyer666@gmail.com', description: 'Электронная почта' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '+79998887766', description: 'Номер телефона' })
  @Column()
  phone: string;

  @ApiProperty({ example: '12345qwerty', description: 'Пароль' })
  @Column()
  password: string;

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
