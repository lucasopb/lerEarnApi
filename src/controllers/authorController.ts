import { NextFunction, Request, Response } from "express";
import { createAuthor, getAuthor, getAuthorById, updateAuthor, deleteAuthor } from "../repository/authorRepository";
import { CreateAuthorDto, UpdateAuthorDto } from "../dtos/author.dto";

export const getAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authors = await getAuthor();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const createAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorDto: CreateAuthorDto = req.body;
    const newAuthor = await createAuthor(authorDto);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

export const updateAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const authorDto: UpdateAuthorDto = req.body;
    const updatedAuthor = await updateAuthor(id, authorDto);
    res.status(200).json(updatedAuthor);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteAuthor(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
