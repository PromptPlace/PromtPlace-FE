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

// 회원 정보 수정
export type RequestEditMemberDto = {
  name?: string;
  nickname?: string;
  email?: string;
};

export type ResponseEditMemberDto = {
  message: string;
  user: {
    user_id: number;
    name: string;
    nickname: string;
    email: string;
    social_type: string;
    status: string;
    role: string;
    updated_at: string;
  };
  statusCode: number;
};

// 회원 한줄 소개 작성
export type RequestIntroDto = {
  intro: string;
};

export type ResponseIntroDto = {
  message: string;
  intro: string;
  updated_at: string;
  statusCode: number;
};
