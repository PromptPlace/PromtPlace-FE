import type { CommonResponse } from '../common';

export interface PromptImage {
  image_url: string | null;
}

export interface Tag {
  name: string;
}
export interface PromptTag {
  tag_id: number;
  tag: Tag;
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
  review_count: number;
  review_rating_avg: number;
  created_at: string;
  updated_at: string;
  inactive_date: string | null;
  download_url: string;
  images: PromptImage[];
  tags: PromptTag[];
  models: PromptModel[];
  user: PromptWriter;
}

export interface SearchPromptWriter {
  user_id: number;
  nickname: string;
  profileImage: {
    url: string | null;
  };
}
export interface searchPrompt {
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
  created_at: string;
  updated_at: string;
  inactive_date: string | null;
  user: SearchPromptWriter;
  models: PromptModel[];
  tags: PromptTag[];
  images: PromptImage[];
  review_count: number;
  review_rating_avg: number;
}

export type RequestSearchPrompt = {
  model: string[] | null;
  tag: string[] | null;
  keyword: string | null;
  page: number;
  size: number;
  sort: 'recent' | 'popular' | 'download' | 'views' | 'rating_avg';
  is_free: boolean;
};

export interface SearchPromptDto {
  model: string[] | null;
  tag: string[] | null;
  keyword: string | null;
  page: number;
  size: number;
  sort: 'recent' | 'popular' | 'download' | 'views' | 'rating_avg';
  is_free: boolean;
}

export type SearchRelatedUser = {
  user_id: number;
  nickname: string;
  profileImage: {
    url: string | null;
  };
  follower_count: number;
};

export type Creator = {
  id: number;
  name: string;
  avatar: string | null;
  followers: number;
  followed: boolean;
};

export type ResponsePromptDTO = CommonResponse<Prompt[]>;
export type ResponseSearchPromptDTO = CommonResponse<{ prompts: searchPrompt[]; related_users: SearchRelatedUser[] }>;
