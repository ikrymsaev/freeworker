import { ServiceEntity } from 'src/resources/service/entities/service.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @OneToMany(() => ServiceEntity, (service) => service)
  services?: ServiceEntity[];
}
