export interface WrittenReview {
  review_id: number;
  prompt_id: number;
  prompt_title: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface WrittenReviewsApiResponse {
  message: string;
  data: {
    statusCode: number;
    reviews: WrittenReview[];
    has_more: boolean;
  };
  statusCode: number;
}

export interface WrittenReviewsFetchResponse {
  statusCode: number;
  reviews: WrittenReview[];
  has_more: boolean;
}

export interface ReceivedReview {
  review_id: number;
  prompt_id: number;
  prompt_title: string;
  writer_id: number;
  writer_nickname: string;
  writer_profile_image_url: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ReceivedReviewsApiResponse {
  message: string;
  data: {
    statusCode: number;
    reviews: ReceivedReview[];
    has_more: boolean;
  };
  statusCode: number;
}

export interface ReceivedReviewsFetchResponse {
  statusCode: number;
  reviews: ReceivedReview[];
  has_more: boolean;
}
