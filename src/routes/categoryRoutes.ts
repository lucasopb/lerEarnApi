import { Router } from "express";
import {
  getAllCategories,
  getCategory,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", createCategoryController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;
