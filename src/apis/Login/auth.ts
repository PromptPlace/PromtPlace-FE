import { axiosInstance } from '../axios.ts';
import type { loginResponse } from '../../types/LoginPage/auth.ts';

export const loginWithGoogle = async (authCode: string, state?: string): Promise<loginResponse> => {
  // GET /api/auth/login/google?code={authorization_code} 요청
  const response = await axiosInstance.get<loginResponse>(`/api/auth/login/google`, {
    params: {
      code: authCode,
      state: state,
    },
  });
  console.log('구글 로그인 응답:', response.data);
  return response.data;
};

export const loginWithNaver = async (authCode: string, state?: string): Promise<loginResponse> => {
  // GET /api/auth/login/naver?code={authorization_code} 요청
  const response = await axiosInstance.get<loginResponse>(`/api/auth/login/naver`, {
    params: {
      code: authCode,
      state: state,
    },
  });

  return response.data;
};
