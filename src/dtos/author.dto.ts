import { Book } from "../entities/Book";

export class CreateAuthorDto {
    name!: string;
    nationality!: string;
    birthDate!: string;
    biography!: string;
}

export class UpdateAuthorDto {
    name?: string;
    nationality?: string;
    birthDate?: string;
    biography?: string;
}

export class AuthorResponseDto {
    id!: string;
    name!: string;
    nationality!: string;
    birthDate!: string;
    biography!: string;
    books?: Book[];
} 