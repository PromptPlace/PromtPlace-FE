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
}
