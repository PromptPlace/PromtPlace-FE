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

// 계정 정지 (관리자)
export type ResponsePatchBanAdminDto = {
  message: string;
  data: null;
  statusCode: number;
};
