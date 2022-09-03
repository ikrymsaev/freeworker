import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Master } from './masters.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Master, (master: Master) => master.category)
  masters: Master[];
}
