import { Request, Response } from 'express';
import { createReview, updateReview, deleteReview, getBookReviews } from '../repository/reviewRepository';

export const createReviewController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error('Usuário não autenticado');

    const review = await createReview(userId, req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao criar review' });
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error('Usuário não autenticado');

    const review = await updateReview(req.params.id, userId, req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao atualizar review' });
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error('Usuário não autenticado');

    await deleteReview(req.params.id, userId);
    res.json({ message: 'Review deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao deletar review' });
  }
};

export const getBookReviewsController = async (req: Request, res: Response) => {
  try {
    const reviews = await getBookReviews(req.params.bookId);
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao buscar reviews' });
  }
}; 