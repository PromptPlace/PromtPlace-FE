import { axiosInstance } from '../axios.ts';
import type { loginResponse } from '../../types/LoginPage/auth.ts';

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
