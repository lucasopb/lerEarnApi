export class CreateReviewDto {
  rating!: number;
  comment!: string;
  bookId!: string;
}

export class UpdateReviewDto {
  rating?: number;
  comment?: string;
}

export class ReviewResponseDto {
  id!: string;
  rating!: number;
  comment!: string;
  user!: {
    id: string;
    name: string;
  };
  book!: {
    id: string;
    title: string;
  };
  createdAt!: Date;
  updatedAt!: Date;
} 