import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('masters')
export class MasterEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column()
  email: string;

  @ApiProperty({ example: '79998887766', description: 'Телефон' })
  @Column()
  phone: string;

  @ApiProperty({ example: 'Пупкин', description: 'Фамилия' })
  @Column({ nullable: true })
  surname: string;

  @ApiProperty({ example: 'Василий', description: 'Имя' })
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.masters)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
