import { CityEntity } from 'src/resources/city/entities/city.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  register_date: Date;

  @ManyToOne(() => CityEntity, (city: CityEntity) => city)
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @Column({ nullable: true })
  hashedRt: string;

  @Column({ nullable: true })
  /** Пользователь тестовый. Для него пароль не хешируется. */
  is_test: boolean;
}
