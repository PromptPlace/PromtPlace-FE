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
  profile_image: null | string;
  created_at: string;
  updated_at: string;
  status: number;
  role: string;
  has_unread_messages: boolean;
}>;

// 회원 팔로워, 팔로잉 목록
export type Follow = {
  follow_id: number;
  following_id: number;
  follower_id: number;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
  following_cnt: number;
  follower_cnt: number;
};

export type ResponseFollowDto = CommonResponse<Follow[]>;

export type FollowingWithStatus = Follow & { isFollowing: boolean };
export type FollowerWithStatus = Follow & { isFollowing: boolean };

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

// 작성한 프롬프트 목록
export type RequestPromptsDto = {
  cursor?: number;
  limit?: number;
};

export type Model = {
  model: {
    name: string;
  };
};

export type Tag = {
  tag: {
    name: string;
  };
};

export type Prompt = {
  prompt_id: number;
  title: string;
  models: Model[];
  tags: Tag[];
};

export type Pagination = {
  nextCursor: null | number;
  has_more: boolean;
  limit: number;
};

export type ResponsePromptsDto = CommonResponse<{ prompts: Prompt[]; pagination: Pagination }>;

// 프롬프트 삭제
export type RequestDeletePromptDto = {
  prompt_id: number;
};

export type ResponseDeletePromptDto = {
  message: string;
  prompt_id: number;
  statusCode: number;
};

// 회원 팔로우
export type ResponsePostFollowDto = CommonResponse<{
  follow_id: number;
  follower_id: number;
  following_id: number;
  created_at: string;
  updated_at: string;
}>;

// 회원 언팔로우
export type ResponseDeleteFollow = {
  message: string;
  statusCode: number;
};

// 회원 프로필 이미지 등록
export type RequestPostImg = {
  profile_image: File;
};

export type ResponsePostImg = {
  error: string;
  message: string;
  statusCode: number;
};

// 프롬프터 알림 등록 & 취소
export type RequestNotificationsDto = {
  prompter_id: number;
};

export type ResponseNotificationsDto = CommonResponse<{
  subscribed: boolean;
  user_id: number;
  prompter_id: number;
}>;

// 프롬프터 구독 여부 조회
export type ResponseIsNotifyDto = CommonResponse<{
  user_id: number;
  prompter_id: number;
  subscribed: boolean;
}>;
