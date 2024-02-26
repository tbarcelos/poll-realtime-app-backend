import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Option } from './option.entity';
import { User } from '@/users/user.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Option, (option) => option.poll, {
    cascade: true,
  })
  options: Option[];
}
