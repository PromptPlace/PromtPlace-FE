export interface UploadPromptRequest {
  title: string;
  prompt: string;
  prompt_result: string;
  has_image: boolean;
  description: string;
  usage_guide: string;
  is_free: boolean;
  price: number;
  model_version: string;
  categories: string[];
  models: string[];
}

export interface UploadPromptResponse {
  data: {
    prompt_id: number;
  };
}
