import { NextFunction, Request, Response } from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../repository/bookRepository";
import { CreateBookDto, UpdateBookDto } from "../dtos/book.dto";

export const getBooksController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const createBookController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bookDto: CreateBookDto = req.body;
    const newBook = await createBook(bookDto);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBookController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const bookDto: UpdateBookDto = req.body;
    const updatedBook = await updateBook(id, bookDto);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteBook(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 