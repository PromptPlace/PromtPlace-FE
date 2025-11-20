import type { Prompt } from '../MainPage/prompt';

export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T[];
}

interface PromptReview {
  nickname: string;
  content: string;
  rating: number;
}

export interface NewAuthoredPromptDTO {
  downloads: number;
  prompt_id: number;
  title: string;
  image_url: string | null;
  views: number;
  reviews: {
    has_more: boolean;
    data: PromptReview[];
  };
}

export interface NewAuthoredPromptsApiResponse {
  message: string;
  statusCode: number;
  data: NewAuthoredPromptDTO[];
  pagination: {
    nextCursor: number | null;
    has_more: boolean;
    limit: number;
  };
  total_prompts: number;
}

export interface NewDownloadedPromptDTO {
  message: string;
  statusCode: number;
  prompt_id: number;
  title: string;
  description: string;
  price: number;
  models: string[];
  imageUrls: string[] | null;
  has_review: boolean;
  is_recent_review: boolean;
  userNickname: string;
  userProfileImageUrl: string | null;
  userReview: {
    review_id: number;
    content: string;
    rating: number;
  } | null;
}

export interface NewDownloadedPromptsApiResponse {
  message: string;
  statusCode: number;
  data: NewDownloadedPromptDTO[];
}

export interface DownloadedPromptDTO {
  prompt_id: number;
  title: string;
  models: string[];
  has_review: boolean;
  is_recent_review: boolean;
  nickname: string;
  statusCode: number;
}

export interface LikedPromptDTO {
  prompt_id: number;
  title: string;
  models: string[];
  tags: string[];
}

export interface NewLikedPromptResponse {
  data: {
    data: Prompt[];
    message: string;
    statusCode: number;
  };
  message: string;
  statusCode: number;
}

export interface AuthoredPromptData {
  prompt_id: number;
  title: string;
  models: { model: { name: string } }[];
  tags: { tag: { name: string } }[];
}

export interface Pagination {
  nextCursor: number | null;
  has_more: boolean;
  limit: number;
}

export interface AuthoredPromptsDTO {
  prompts: AuthoredPromptData[];
  pagination: Pagination;
}

export interface AuthoredPromptsApiResponse {
  message: string;
  statusCode: number;
  data: {
    // data 프로퍼티가 AuthoredPromptsDTO와 같은 객체임을 명시
    prompts: AuthoredPromptData[];
    pagination: Pagination;
  };
}
