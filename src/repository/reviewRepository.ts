import { AppDataSource } from '../config/dataSource';
import { Review } from '../entities/Review';
import { CreateReviewDto, UpdateReviewDto, ReviewResponseDto } from '../dtos/review.dto';

const repository = AppDataSource.getRepository(Review);

export const createReview = async (userId: string, reviewDto: CreateReviewDto): Promise<ReviewResponseDto> => {
  const newReview = repository.create({
    rating: reviewDto.rating,
    comment: reviewDto.comment,
    user: { id: userId },
    book: { id: reviewDto.bookId }
  });

  await repository.save(newReview);

  const savedReview = await repository.findOne({
    where: { id: newReview.id },
    relations: ['user', 'book']
  });

  if (!savedReview) throw new Error('Erro ao criar review');

  return {
    id: savedReview.id,
    rating: savedReview.rating,
    comment: savedReview.comment,
    user: {
      id: savedReview.user.id,
      name: savedReview.user.name
    },
    book: {
      id: savedReview.book.id,
      title: savedReview.book.title
    },
    createdAt: savedReview.createdAt,
    updatedAt: savedReview.updatedAt
  };
};

export const updateReview = async (id: string, userId: string, reviewDto: UpdateReviewDto): Promise<ReviewResponseDto> => {
  const review = await repository.findOne({
    where: { id, user: { id: userId } },
    relations: ['user', 'book']
  });

  if (!review) throw new Error('Review não encontrada ou você não tem permissão para editá-la');

  Object.assign(review, reviewDto);
  await repository.save(review);

  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    user: {
      id: review.user.id,
      name: review.user.name
    },
    book: {
      id: review.book.id,
      title: review.book.title
    },
    createdAt: review.createdAt,
    updatedAt: review.updatedAt
  };
};

export const deleteReview = async (id: string, userId: string): Promise<void> => {
  const review = await repository.findOne({
    where: { id, user: { id: userId } }
  });

  if (!review) throw new Error('Review não encontrada ou você não tem permissão para deletá-la');

  await repository.remove(review);
};

export const getBookReviews = async (bookId: string): Promise<ReviewResponseDto[]> => {
  const reviews = await repository.find({
    where: { book: { id: bookId } },
    relations: ['user', 'book']
  });

  return reviews.map(review => ({
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    user: {
      id: review.user.id,
      name: review.user.name
    },
    book: {
      id: review.book.id,
      title: review.book.title
    },
    createdAt: review.createdAt,
    updatedAt: review.updatedAt
  }));
}; 