import { axiosInstance } from '@/apis/axios';
import type { AccountInfo, AccountApiResponse, RegisterInfo } from '@/types/MyPage/account'; // 타입 파일 경로

export const getAccountInfo = async (): Promise<AccountInfo> => {
  const { data } = await axiosInstance.get<AccountApiResponse>('/api/members/me/accounts');
  return data.data;
};

export const registerAccountInfo = async (accountData: RegisterInfo) => {
  const { data } = await axiosInstance.post('/api/members/me/accounts', accountData);
  return data;
};

//추후 api 명세서 반영하여 수정 필요
export const updateAccountInfo = async (accountData: RegisterInfo) => {
  const { data } = await axiosInstance.patch('/api/members/me/accounts', accountData);
  return data;
};
