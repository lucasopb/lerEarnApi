import { AppDataSource } from "../config/dataSource";
import { Category } from "../entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export const createCategory = async (name: string, description: string) => {
  const newCategory = categoryRepository.create({ name, description });
  return await categoryRepository.save(newCategory);
};

export const getCategories = async () => {
  return await categoryRepository.find({ relations: ["books"] });
};

export const getCategoryById = async (id: string) => {
  return await categoryRepository.findOne({ where: { id }, relations: ["books"] });
};

export const updateCategory = async (id: string, name: string, description: string) => {
  const category = await getCategoryById(id);
  if (!category) throw new Error("Category not found");

  category.name = name ?? category.name;
  category.description = description ?? category.description;

  return await categoryRepository.save(category);
};

export const deleteCategory = async (id: string) => {
  const category = await getCategoryById(id);
  if (!category) throw new Error("Category not found");

  return await categoryRepository.delete(id);
};
