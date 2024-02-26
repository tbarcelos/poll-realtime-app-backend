import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Poll } from './poll.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  votesCount: number;

  @ManyToOne(() => Poll, (poll) => poll.options)
  poll: Poll;
}
