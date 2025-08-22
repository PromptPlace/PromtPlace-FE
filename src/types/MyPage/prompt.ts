export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T[];
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
