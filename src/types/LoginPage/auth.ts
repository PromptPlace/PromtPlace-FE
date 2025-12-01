import type { CommonResponse } from '../common';



export interface initialSetupRequest {
  nickname: string;
  intro: string;
}

export interface initialSetupResponseData {
  message: string;
  data:{
    user_id: number;
    nickname: string;
  }
}
export type initialSetupResponse = CommonResponse<initialSetupResponseData>;


export interface signinRequest {
  email: string;
  password: string;
}

export interface signinResponseData {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      user_id: number;
      email: string;
      role: 'USER' | 'ADMIN';
      isInitialSetupRequired: boolean;
    };
  };
}
export type signinResponse = CommonResponse<signinResponseData>;

export interface signupEmailVerifyData {
  message: string;
}
export type signupEmailVerifyResponse = CommonResponse<signupEmailVerifyData>;

//비밀번호 재설정 인증번호 요청 타입 정의
export interface resetPasswordEmailVerifyData {
  message: string;
}
export type resetPasswordEmailVerifyResponse = CommonResponse<resetPasswordEmailVerifyData>;

//비밀번호 재설정 인증번호 확인 요청 타입 정의
export interface resetPasswordVerifyCodeRequest {
  email: string;
  code: string;
}

export interface resetPasswordVerifyCodeResponseData {
  message: string;
  tempToken: string;
}

export type resetPasswordVerifyCodeResponse = CommonResponse<resetPasswordVerifyCodeResponseData>;

//비밀번호 재설정 요청 타입 정의
export interface resetPasswordRequest {
  email: string;
  newPassword: string;
  confirmPassword: string;
  tempToken: string;
}
export interface resetPasswordResponseData {
  message: string;
}
export type resetPasswordResponse = CommonResponse<resetPasswordResponseData>;

//회원가입 인증번호 확인 요청 타입 정의
export interface signupVerifyCodeRequest {
  email: string;
  code: string;
}

export interface signupVerifyCodeResponseData {
  message: string;
  tempToken: string;
}

//회원가입 요청 타입 정의
export type signupVerifyCodeResponse = CommonResponse<signupVerifyCodeResponseData>;

interface consentItem {
  type: 'SERVICE_TERMS_REQUIRED' | 'PRIVACY_POLICY_REQUIRED' | 'OVER_14_REQUIRED' | 'MARKETING_OPTIONAL';
  isAgreed: boolean;
}

export interface signupRequest {
  email: string;
  password: string;
  tempToken: string;
  consents: consentItem[];
}

// 회원가입 응답 타입 정의
interface signupUser {
  user_id: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  social_type: 'GOOGLE' | 'NAVER' | 'KAKAO' | 'EMAIL';
  status: boolean;
  inactivate_date: string | null;
  create_at: string;
  updated_at: string;
  role: 'USER' | 'ADMIN';
}

interface signupResponseData {
  message: string;
  user: signupUser;
}

export type signupResponse = CommonResponse<signupResponseData>;

export interface User {
  user_id: number;
  email: string;
  status?: boolean;
  role: 'USER' | 'ADMIN';
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

export type ModalView =
  | 'login'
  | 'signup'
  | 'initPassword'
  | 'agreeTerms'
  | 'onboarding'
  | 'changePassword'
  | 'forgotPassword'
  | 'close';
export type EmailStatus = 'default' | 'pending' | 'verified' | 'error';
export type CodeStatus = 'idle' | 'request' | 'verified' | 'error';
