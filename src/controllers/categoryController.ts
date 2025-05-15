import { NextFunction, Request, Response } from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../repository/categoryRepository";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";

export const getCategoriesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoryDto: CreateCategoryDto = req.body;
    const newCategory = await createCategory(categoryDto);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryDto: UpdateCategoryDto = req.body;
    const updatedCategory = await updateCategory(id, categoryDto);
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
