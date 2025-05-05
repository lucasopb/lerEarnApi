import { Router } from "express";
import { 
    getAuthorController,
    getAuthorByIdController,
    createAuthorController,
    updateAuthorController,
    deleteAuthorController 
} from "../controllers/authorController";

const router = Router();

router.get("/", getAuthorController);
router.get("/:id", getAuthorByIdController);
router.post("/", createAuthorController);
router.put("/:id", updateAuthorController);
router.delete("/:id", deleteAuthorController);

export default router;