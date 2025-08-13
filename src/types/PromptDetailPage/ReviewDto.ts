export type ResponseDeleteReviewDto = {
  message: string; // "리뷰가 성공적으로 삭제되었습니다."
  data: Record<string, never>;
  statusCode: number; // 200
};

export type ResponseUpdateReviewDto = {
  message: string; // "리뷰가 성공적으로 수정되었습니다."
  data: {
    review_id: number;
    prompt_id: number;
    writer_name: string;
    rating: number;
    content: string;
    updated_at: string;
  };
  statusCode: number;
};

export type RequestUpdateReviewDto = {
  rating: number;
  content: string;
};

export interface RequestCreateReviewDto {
  rating: number;
  content: string;
}
