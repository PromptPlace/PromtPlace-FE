// 프롬프트 삭제 (관리자)
export type ResponseDeletePromptAdminDto = {
  message: string;
  data?: null;
  statusCode: number;
  error?: string;
};

// 회원 이력 삭제 (관리자)
export type ResponseDeleteHistoriesAdminDto = {
  message: 'string';
  data?: null;
  statusCode: number;
  error: string;
};

// 계정 정지, 계정 삭제 (관리자)
export type ResponseAccountAdminDto = {
  message: string;
  data: null;
  statusCode: number;
};

// 메시지 전송 (관리자)
export type RequestMsgAdminDto = {
  sender_id: number;
  receiver_id: number;
  title: string;
  body: string;
};

export type ResponseMsgAdminDto = {
  message: string;
  message_id: number;
  statusCode: number;
};
