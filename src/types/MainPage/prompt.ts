import type { CommonResponse } from "../common";

export interface PromptImage {
  image_url: string|null;
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
  writer: UserProfile;
}

export interface UserProfile {
  id: number;
  name: string;
  avatar: string | null;
  followers: number;
  followed: boolean;
}

export type ResponsePromptDTO = CommonResponse<Prompt[]>;

export type ResponseUserProfileDTO = CommonResponse<UserProfile>;
