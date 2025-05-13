import { AppDataSource } from "../config/dataSource";
import { Book } from "../entities/Book";

const bookRepository = AppDataSource.getRepository(Book);

export const createBook = async (title: string, description: string, publication_year: number, url_download: string, author_id: string, category_id: string) => {
  const newBook = bookRepository.create({title,description,publication_year,url_download,author: { id: author_id },category: { id: category_id }
  });
  return await bookRepository.save(newBook);
};

export const getBooks = async () => {
  return await bookRepository.find({ relations: ["author", "category"] });
};

export const getBookById = async (id: string) => {
  return await bookRepository.findOne({ where: { id }, relations: ["author", "category"] });
};

export const updateBook = async (id: string, title: string, description: string, publication_year: number, url_download: string, author_id: string, category_id: string) => {
  const book = await getBookById(id);
  if (!book) throw new Error("Book not found");

  const updateData: Partial<Book> = {title: title ?? book.title,description: description ?? book.description,publication_year: publication_year ?? book.publication_year,url_download: url_download ?? book.url_download};

  if (author_id) {
    updateData.author = { id: author_id } as any;
  }

  if (category_id) {
    updateData.category = { id: category_id } as any;
  }

  Object.assign(book, updateData);
  return await bookRepository.save(book);
};

export const deleteBook = async (id: string) => {
  const book = await getBookById(id);
  if (!book) throw new Error("Book not found");

  return await bookRepository.delete(id);
};
