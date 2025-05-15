import { AppDataSource } from "../config/dataSource";
import { Category } from "../entities/Category";
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from "../dtos/category.dto";

const categoryRepository = AppDataSource.getRepository(Category);

export const createCategory = async (categoryDto: CreateCategoryDto): Promise<CategoryResponseDto> => {
  const newCategory = categoryRepository.create(categoryDto);
  return await categoryRepository.save(newCategory);
};

export const getCategories = async (): Promise<CategoryResponseDto[]> => {
  return await categoryRepository.find({ relations: ["books"] });
};

export const getCategoryById = async (id: string): Promise<CategoryResponseDto | null> => {
  return await categoryRepository.findOne({ where: { id }, relations: ["books"] });
};

export const updateCategory = async (id: string, categoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> => {
  const category = await getCategoryById(id);
  if (!category) throw new Error("Category not found");

  Object.assign(category, categoryDto);
  return await categoryRepository.save(category);
};

export const deleteCategory = async (id: string): Promise<void> => {
  const result = await categoryRepository.delete(id);
  if (result.affected === 0) throw new Error("Category not found");
};
