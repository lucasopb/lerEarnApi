import { Router } from "express";
import {
    getCategoriesController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getCategoriesController);
router.get("/:id", getCategoryByIdController);
router.post("/", createCategoryController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;
