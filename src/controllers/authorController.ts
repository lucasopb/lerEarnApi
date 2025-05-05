import { NextFunction, Request, Response } from "express";
import { createAuthor, getAuthor, getAuthorById, updateAuthor, deleteAuthor } from "../repository/authorRepository";

export const getAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const author = await getAuthor();
    res.status(200).json(author);
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
    const { name, nationality, birthDate, biography } = req.body;
    const newAuthor = await createAuthor(name, nationality, birthDate, biography);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

export const updateAuthorController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, nationality, birthDate, biography } = req.body;

    const updatedCategory = await updateAuthor(id, name, nationality, birthDate, biography);
    res.status(200).json(updatedCategory);
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
