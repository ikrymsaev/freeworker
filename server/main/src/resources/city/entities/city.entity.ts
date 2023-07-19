import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  city_id: number;
  @Column()
  name: string;
}
