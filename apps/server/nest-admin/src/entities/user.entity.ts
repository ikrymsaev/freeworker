import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ unique: true })
  nickname: string;
  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  hash: string;

  @Column({ nullable: true })
  hashedRt: string | null;
}
