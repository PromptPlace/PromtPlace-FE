import type { CommonResponse } from '../common';

export interface PromptImage {
  image_url: string | null;
}

export interface PromptTag {
  tag_id: number;
  name: string;
}

export interface PromptWriter {
  user_id: number;
  nickname: string;
  profile_img_url: string | null;
}

export interface PromptModel {
  name: string;
}

export interface PromptModel {
  promptmodel_id: number;
  prompt_id: number;
  model_id: number;
  model: PromptModel;
}
export interface Prompt {
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
  review_counts: number;
  rating_avg: number;
  created_at: string;
  updated_at: string;
  inactive_date: string | null;
  download_url: string;
  images: PromptImage[];
  tags: PromptTag[];
  models: PromptModel[];
  user: PromptWriter;
}

export interface searchPrompt {
  prompt_id: number;
  title: string;
  has_image: boolean;
  description: string;
  is_free: boolean;
  views: number;
  likes: number;
  rating_avg: number;
  created_at: string;
  updated_at: string;
  images: PromptImage[];
}

export type RequestSearchPrompt = {
  model?: string[] | null;
  tag?: string[] | null;
  keyword: string;
  page?: number;
  size?: number;
  sort?: string;
  is_free?: boolean;
};

export type ResponsePromptDTO = CommonResponse<Prompt[]>;
export type ResponseSearchPromptDTO = CommonResponse<searchPrompt[]>;
