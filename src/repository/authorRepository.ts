import { AppDataSource } from "../config/dataSource";
import { Author } from "../entities/Author";

const authorRepository = AppDataSource.getRepository(Author)

export const createAuthor = async (name: string, nationality: string, birthDate: string, biography: string) => {
    const newAuthor = authorRepository.create({ name, nationality, birthDate, biography });
    return await authorRepository.save(newAuthor);
}

export const getAuthor = async () => {
  return await authorRepository.find({ relations: ["books"] });
};

export const getAuthorById = async (id: string) => {
  return await authorRepository.findOne({ where: { id }, relations: ["books"] });
};

export const updateAuthor = async (id: string, name: string, nationality: string, birthDate: string, biography: string) => {
  const author = await getAuthorById(id);
  if (!author) throw new Error("Author not found");

  author.name = name ?? author.name;
  author.nationality = nationality ?? author.nationality;
  author.birthDate = birthDate ?? author.birthDate
  author.biography = biography ?? author.biography

  return await authorRepository.save(author);
};

export const deleteAuthor = async (id: string) => {
  const author = await getAuthorById(id);
  if (!author) throw new Error("Author not found");

  return await authorRepository.delete(id);
};
