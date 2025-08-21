import type { CommonResponse } from '../common';

export interface member {
  user_id: number;
  nickname: string;
  created_at: string;
  updated_at: string;
  follower_cnt: number;
  profile_img_url?: string | null;
}

export interface Prompter {
  members: member[];
  total: number;
  page: number;
  limit: number;
  follower_cnt: number;
}

export type ResponsePrompterDTO = CommonResponse<Prompter>;
