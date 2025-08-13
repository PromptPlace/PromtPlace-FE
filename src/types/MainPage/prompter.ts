import type { CommonResponse } from '../common';

export interface Prompter {
  member_id: number;
  nickname: string;
  created_at: string;
  updated_at: string;
  follower_cnt: number;
}

export type ResponsePrompterDTO = CommonResponse<Prompter[]>;
