import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MasterEntity } from './masters.entity';

@Entity('categories')
export class CategoryEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Доставка', description: 'Название' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Различные службы доставки',
    description: 'Описание',
  })
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => MasterEntity, (master) => master.category)
  masters: MasterEntity[];
}
