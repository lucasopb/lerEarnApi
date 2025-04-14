"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const dataSource_1 = require("../config/dataSource");
const Category_1 = require("../entities/Category");
const categoryRepository = dataSource_1.AppDataSource.getRepository(Category_1.Category);
const createCategory = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = categoryRepository.create({ name, description });
    return yield categoryRepository.save(newCategory);
});
exports.createCategory = createCategory;
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield categoryRepository.find({ relations: ["books"] });
});
exports.getCategories = getCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield categoryRepository.findOne({ where: { id }, relations: ["books"] });
});
exports.getCategoryById = getCategoryById;
const updateCategory = (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, exports.getCategoryById)(id);
    if (!category)
        throw new Error("Category not found");
    category.name = name !== null && name !== void 0 ? name : category.name;
    category.description = description !== null && description !== void 0 ? description : category.description;
    return yield categoryRepository.save(category);
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, exports.getCategoryById)(id);
    if (!category)
        throw new Error("Category not found");
    return yield categoryRepository.delete(id);
});
exports.deleteCategory = deleteCategory;
