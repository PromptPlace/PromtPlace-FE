// Presigned URL 요청/응답
export interface PresignUrlRequest {
  key: string;
  contentType: string;
}

export interface PresignUrlResponse {
  url: string;
  key: string;
}

// 이미지 매핑 요청
export interface ImageMappingRequest {
  image_url: string;
  order_index: number;
}

// 프롬프트 업로드 요청
export interface UploadPromptWithImageRequest {
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

// 프롬프트 업로드 응답
export interface UploadPromptWithImageResponse {
  data: {
    prompt_id: number;
  };
}

// 이미지 키 정보
export interface ImageKeyInfo {
  key: string;
  order_index: number;
}
