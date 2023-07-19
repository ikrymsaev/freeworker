import { CategoryEntity } from 'src/resources/category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
