import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  nationality!: string;

  @Column()
  birthDate!: string;

  @Column()
  biography!: string;

  @OneToMany(() => Book, book => book.author)
  books!: Book[];
}
