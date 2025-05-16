import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  rating!: number;

  @Column('text')
  comment!: string;

  @ManyToOne(() => User, user => user.reviews)
  user!: User;

  @ManyToOne(() => Book, book => book.reviews)
  book!: Book;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 