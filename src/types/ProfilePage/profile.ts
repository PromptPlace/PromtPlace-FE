import type { CommonResponse } from '../common';

// 특정 회원 정보 불러오기
export type RequestMemberDto = {
  member_id: number;
};

export type ResponseMemberDto = CommonResponse<{
  member_id: number;
  email: string;
  name: string;
  nickname: string;
  intros: string;
  created_at: string;
  updated_at: string;
  status: number;
}>;

// 회원 팔로워, 팔로잉 목록
export type Follow = {
  follow_id: number;
  follower_id: number;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type ResponseFollowDto = CommonResponse<Follow[]>;
