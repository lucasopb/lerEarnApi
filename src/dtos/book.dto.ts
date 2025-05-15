import { Author } from "../entities/Author";
import { Category } from "../entities/Category";

export class CreateBookDto {
    title!: string;
    description!: string;
    publication_year!: number;
    url_download!: string;
    author_id!: string;
    category_id!: string;
}

export class UpdateBookDto {
    title?: string;
    description?: string;
    publication_year?: number;
    url_download?: string;
    author_id?: string;
    category_id?: string;
}

export class BookResponseDto {
    id!: string;
    title!: string;
    description!: string;
    publication_year!: number;
    url_download!: string;
    author?: Author;
    category?: Category;
} 