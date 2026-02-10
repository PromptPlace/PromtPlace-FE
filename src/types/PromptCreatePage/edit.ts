import type { CommonResponse } from '../common';

// 프롬프트 수정
export type EditPromptDto = {
  title: string;
  prompt: string;
  prompt_result: string;
  description: string;
  usage_guide: string;
  price: number;
  models: string[];
  is_free: boolean;
  has_image: boolean;
  model_version: string;
  categories: string[];
};

export type RequestEditPromptDto = {
  promptId: number;
  body: EditPromptDto;
};

export type Category = {
  promptcategory_id: number;
  prompt_id: number;
  category_id: number;
  category: {
    category_id: number;
    name: string;
    main_category_id: number;
  };
};

export type Model = {
  promptmodel_id: number;
  prompt_id: number;
  model_id: number;
  model: {
    model_id: number;
    name: string;
    model_category_id: number;
  };
};

export type ResponseEditPromptDto = CommonResponse<{
  prompt_id: number;
  user_id: number;
  title: string;
  prompt: string;
  prompt_result: string;
  has_image: boolean;
  description: string;
  usage_guide: string;
  price: number;
  is_free: boolean;
  downloads: number;
  views: number;
  likes: number;
  model_version: string;
  created_at: string;
  updated_at: string;
  inactive_date: string;
  categories: Category[];
  models: Model[];
}>;
