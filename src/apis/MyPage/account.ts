import { axiosInstance } from '@/apis/axios';
import type { AccountInfo, AccountApiResponse, RegisterInfo } from '@/types/MyPage/account'; // 타입 파일 경로

export const getAccountInfo = async (): Promise<AccountInfo> => {
  const { data } = await axiosInstance.get<AccountApiResponse>('/api/members/me/accounts');
  return data.data;
};

export const registerAccountInfo = async (accountData: RegisterInfo) => {
  // POST 요청으로 /api/account 엔드포인트에 계좌 정보를 보냅니다.
  const { data } = await axiosInstance.post('/api/account', accountData);
  return data;
};
