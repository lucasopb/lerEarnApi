import { Router } from 'express';
import { createReviewController, updateReviewController, deleteReviewController, getBookReviewsController } from '../controllers/reviewController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();


router.post('/', authMiddleware, createReviewController);
router.put('/:id', authMiddleware, updateReviewController);
router.delete('/:id', authMiddleware, deleteReviewController);


router.get('/book/:bookId', getBookReviewsController);

export default router; 