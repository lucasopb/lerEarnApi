import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Author } from "./Author";
import { Category } from "./Category";
import { Review } from "./Review";

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  publication_year!: number;

  @Column()
  url_download!: string;

  @ManyToOne(() => Author, author => author.books)
  author!: Author;

  @ManyToOne(() => Category, category => category.books)
  category!: Category;

  @OneToMany(() => Review, review => review.book)
  reviews!: Review[];
}
