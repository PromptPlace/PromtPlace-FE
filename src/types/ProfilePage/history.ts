// 회원 이력 조회
export type History = {
  history: string;
  history_id: number;
  updated_at: string;
  user_id: number;
};

export type ResponseMemberHistoryDto = {
  message: string;
  histories: History[];
  total_count: number;
  statusCode: number;
};

// 회원 이력 작성
export type RequestHistoryDto = {
  history: string;
};

export type ResponseHistoryDto = {
  message: string;
  history: {
    history_id: number;
    history: string;
  };
  statusCode: number;
};

// 회원 이력 수정
export type RequestEditHistoryDto = {
  history_id: number;
  history: string;
};

export type ResponseEditHistoryDto = {
  message: string;
  history_id: number;
  history: string;
  statusCode: number;
};

// 회원 이력 삭제
export type RequestDeleteHistoryDto = {
  history_id: number;
};

export type ResponseDeleteHistoryDto = {
  message: string;
  history_id: number;
  deleted_at: string;
  statusCode: number;
};
