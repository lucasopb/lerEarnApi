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
exports.deleteCategoryController = exports.updateCategoryController = exports.createCategoryController = exports.getCategory = exports.getAllCategories = void 0;
const categoryRepository_1 = require("../repository/categoryRepository");
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, categoryRepository_1.getCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategories = getAllCategories;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield (0, categoryRepository_1.getCategoryById)(id);
        if (!category) {
            res.status(404).json({ message: "Categoria não encontrada" });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategory = getCategory;
const createCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const newCategory = yield (0, categoryRepository_1.createCategory)(name, description);
        res.status(201).json(newCategory);
    }
    catch (error) {
        next(error);
    }
});
exports.createCategoryController = createCategoryController;
const updateCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = yield (0, categoryRepository_1.updateCategory)(id, name, description);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, categoryRepository_1.deleteCategory)(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategoryController = deleteCategoryController;
