export type PromptReviewDto = {
  review_id: number;
  writer_id: number;
  writer_nickname: string;
  writer_image_url: string | null;
  rating: number;
  content: string;
  created_at: string;
};

export type PromptReviewListDto = {
  reviews: PromptReviewDto[];
  has_more: boolean;
};

export type ApiEnvelopeCamel<T> = {
  message: string;
  data: T;
  statusCode: number;
};

export interface RequestCreateReviewDto {
  promptId: number;
  rating: number;
  content: string;
}
export interface ResponseCreateReviewDto {
  data: PromptReviewDto;
}

export interface RequestUpdateReviewDto {
  content: string;
  rating?: number;
}
export interface ResponseUpdateReviewDto {
  data: PromptReviewDto;
}

export interface ResponseDeleteReviewDto {
  data: { review_id: number };
}
