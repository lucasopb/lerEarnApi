import { AppDataSource } from "../config/dataSource";
import { Author } from "../entities/Author";
import { CreateAuthorDto, UpdateAuthorDto, AuthorResponseDto } from "../dtos/author.dto";

const authorRepository = AppDataSource.getRepository(Author);

export const createAuthor = async (authorDto: CreateAuthorDto): Promise<AuthorResponseDto> => {
  const newAuthor = authorRepository.create(authorDto);
  return await authorRepository.save(newAuthor);
}

export const getAuthor = async (): Promise<AuthorResponseDto[]> => {
  return await authorRepository.find({ relations: ["books"] });
};

export const getAuthorById = async (id: string): Promise<AuthorResponseDto | null> => {
  return await authorRepository.findOne({ where: { id }, relations: ["books"] });
};

export const updateAuthor = async (id: string, authorDto: UpdateAuthorDto): Promise<AuthorResponseDto> => {
  const author = await getAuthorById(id);
  if (!author) throw new Error("Author not found");

  Object.assign(author, authorDto);
  return await authorRepository.save(author);
};

export const deleteAuthor = async (id: string): Promise<void> => {
  const result = await authorRepository.delete(id);
  if (result.affected === 0) throw new Error("Author not found");
};
