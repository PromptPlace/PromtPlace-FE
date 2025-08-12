import type { CommonResponse } from '../common';

// 문의하기
export type RequestInquiriesDto = {
  receiver_id: number;
  type: string;
  title: string;
  content: string;
};

export type ResponseInquiriesDto = CommonResponse<{
  inquiry_id: number;
  sender_id: number;
  receiver_id: number;
  type: string;
  status: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}>;

// 받은 문의 목록
export type RequestGetInquiriesDto = {
  type?: 'buyer' | 'non_buyer' | '';
};

export type ResponseGetInquiriesDto = CommonResponse<
  {
    inquiry_id: number;
    sender_id: number;
    sender_nickname: string;
    type: string;
    status: string;
    title: string;
    created_at: string;
    updated_at: string;
  }[]
>;

// 문의 상세 정보
export type RequestGetDetailInquiriesDto = {
  inquiry_id: number;
};

export type ResponseGetDetailInquiriesDto = CommonResponse<{
  inquiry_id: number;
  sender_id: number;
  sender_nickname: string;
  receiver_id: number;
  receiver_nickname: string;
  type: string;
  status: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}>;

// 문의 답변하기
export type RequestReplyInquiriesDto = {
  content: string;
};

export type ResponseReplyInquiriesDto = CommonResponse<{
  reply_id: number;
  inquiry_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}>;

// 문의 읽음 처리
export type ResponseReadInquiriesDto = CommonResponse<{
  inquiry_id: number;
  status: string;
  updated_at: string;
}>;
