export interface User {
  user_id: number;
  name: string;
  nickname: string;
  email: string;
  social_type: 'GOOGLE' | 'NAVER' | 'KAKAO';
  status: 'ACTIVE' | 'INACTIVE';
  role: 'USER' | 'ADMIN';
  create_at: string;
  updated_at: string;
}

// 로그인 성공 시 data 객체의 타입 정의
export interface loginResponseData {
  access_token: string;
  refresh_token: string;
  user: User;
}

// 로그인 API 응답 전체의 타입 정의
export interface loginResponse {
  message: string;
  data: loginResponseData;
  statusCode: number;
}
