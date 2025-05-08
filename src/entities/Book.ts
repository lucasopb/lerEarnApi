import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Author } from "./Author";
import { Category } from "./Category";

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

  @ManyToOne(() => Author, author => author.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author!: Author;

  @Column()
  author_id!: string;

  @ManyToOne(() => Category, category => category.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column()
  category_id!: string;
}
