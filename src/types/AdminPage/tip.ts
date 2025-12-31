import type { CommonResponse } from '../common';

// 프롬프트 팁 작성 (관리자)
export type RequestTipAdminDto = {
  writer_id: number;
  title: string;
  content: string;
  file_url: string;
};

export type ResponseTipAdminDto = CommonResponse<{
  tip_id: number;
}>;

// 프롬프트 팁 수정 (관리자)
export type RequestPatchTipAdminDto = {
  title: string;
  content: string;
};

export type ResponsePatchTipAdminDto = CommonResponse<{
  tip_id: number;
  updated_at: Date;
}>;

// 공지사항 작성 (관리자)
export type ResponseNoticeAdminDto = CommonResponse<{
  announcement_id: number;
}>;
