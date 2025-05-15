import { AppDataSource } from "../config/dataSource";
import { Book } from "../entities/Book";
import { CreateBookDto, UpdateBookDto, BookResponseDto } from "../dtos/book.dto";

const bookRepository = AppDataSource.getRepository(Book);

export const createBook = async (bookDto: CreateBookDto): Promise<BookResponseDto> => {
  const newBook = bookRepository.create({
    ...bookDto,
    author: { id: bookDto.author_id },
    category: { id: bookDto.category_id }
  });
  return await bookRepository.save(newBook);
};

export const getBooks = async (): Promise<BookResponseDto[]> => {
  return await bookRepository.find({ relations: ["author", "category"] });
};

export const getBookById = async (id: string): Promise<BookResponseDto | null> => {
  return await bookRepository.findOne({ where: { id }, relations: ["author", "category"] });
};

export const updateBook = async (id: string, bookDto: UpdateBookDto): Promise<BookResponseDto> => {
  const book = await getBookById(id);
  if (!book) throw new Error("Book not found");

  const updateData: any = { ...bookDto };
  if (bookDto.author_id) {
    updateData.author = { id: bookDto.author_id };
    delete updateData.author_id;
  }
  if (bookDto.category_id) {
    updateData.category = { id: bookDto.category_id };
    delete updateData.category_id;
  }

  Object.assign(book, updateData);
  return await bookRepository.save(book);
};

export const deleteBook = async (id: string): Promise<void> => {
  const result = await bookRepository.delete(id);
  if (result.affected === 0) throw new Error("Book not found");
};
