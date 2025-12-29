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
