import { axiosInstance } from '../axios.ts';
import type { loginResponse } from '../../types/LoginPage/auth.ts';
import type {
  signupEmailVerifyResponse,
  signupVerifyCodeResponse,
  signupVerifyCodeRequest,
  signupRequest,
  signupResponse,
  resetPasswordEmailVerifyResponse,
  resetPasswordVerifyCodeResponse,
  resetPasswordVerifyCodeRequest,
  resetPasswordRequest,
  resetPasswordResponse,
  signinRequest,
  signinResponse,
  initialSetupRequest,
  initialSetupResponse,
} from '../../types/LoginPage/auth.ts';

export const postGoogleAuthCode = async (authCode: string) => {
  const { data } = await axiosInstance.post<loginResponse>('/api/auth/google/token', { code: authCode });
  console.log('Google login response:', data);
  return data;
};

export const postNaverAuthCode = async (authCode: string) => {
  const { data } = await axiosInstance.post<loginResponse>('/api/auth/naver/token', { code: authCode });
  console.log('Naver login response:', data);
  return data;
};

//카카오는 request body에 인가 코드뿐만 아니라 추가적인 정보까지 담을 듯 합니다
export const postKakaoAuthCode = async (authCode: string) => {
  const { data } = await axiosInstance.post<loginResponse>('/api/auth/kakao/token', { code: authCode });
  console.log('Kakao login response:', data);
  return data;
};

export const postSignupEmailAuthCode = async (email: string) => {
  const { data } = await axiosInstance.post<signupEmailVerifyResponse>('/api/auth/signup/send-code', {
    email,
  });
  console.log('Signup email verify response:', data);
  return data;
};

export const postSignupVerifyCode = async (data: signupVerifyCodeRequest) => {
  const response = await axiosInstance.post<signupVerifyCodeResponse>('/api/auth/signup/verify-code', data);
  console.log('Signup verify code response:', response.data);
  return response.data;
};

export const postSignup = async (data: signupRequest) => {
  const response = await axiosInstance.post<signupResponse>('/api/auth/signup/register', data);
  console.log('Signup response:', response.data);
  return response.data;
};

export const postResetPasswordEmailAuthCode = async (email: string) => {
  const { data } = await axiosInstance.post<resetPasswordEmailVerifyResponse>('/api/auth/password/send-code', {
    email,
  });
  console.log('Reset password email verify response:', data);
  return data;
};

export const postResetPasswordVerifyCode = async (data: resetPasswordVerifyCodeRequest) => {
  const response = await axiosInstance.post<resetPasswordVerifyCodeResponse>('/api/auth/password/verify-code', data);
  console.log('Reset password verify code response:', response.data);
  return response.data;
};

export const postResetPassword = async (data: resetPasswordRequest) => {
  const response = await axiosInstance.post<resetPasswordResponse>('/api/auth/password/reset', data);
  console.log('Reset password response:', response.data);
  return response.data;
};

export const postSignin = async (data: signinRequest) => {
  const response = await axiosInstance.post<signinResponse>('/api/auth/signin', data);
  console.log('Signin response:', response.data);
  return response.data;
}

export const postInitialSetup = async (data: initialSetupRequest) => {
  const response = await axiosInstance.post<initialSetupResponse>('/api/auth/signin/initial-setup', data);
  console.log('Initial setup response:', response.data);
  return response.data;
};
