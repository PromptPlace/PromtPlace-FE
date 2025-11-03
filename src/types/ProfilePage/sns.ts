import type { CommonResponse } from '../common';

// 회원 SNS 목록
export type SNS = {
  sns_id: number;
  user_id: number;
  url: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_sns_id: string;
};

export type ResponseSNSDto = CommonResponse<SNS[]>;

// 회원 SNS 수정
export type RequestPatchSNSDto = {
  url: string;
  description: string;
  user_sns_id: string;
};

export type ResponsePatchSNSDto = {
  message: string;
  sns_id: number;
  url: string;
  description: string;
  updated_at: string;
  statusCode: number;
};

// 회원 SNS 삭제
export type ResponseDeleteSNS = {
  message: string;
  statusCode: number;
};

// 회원 SNS 작성
export type RequestPostSNS = RequestPatchSNSDto;

export type ResponsePostSns = {
  message: string;
  sns_id: number;
  url: string;
  description: string;
  created_at: string;
  statusCode: number;
  user_sns_id: string;
};
