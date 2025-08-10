import { axiosInstance } from '@/apis/axios';
import type { AccountInfo, AccountApiResponse } from '@/types/MyPage/account'; // 타입 파일 경로

export const getAccountInfo = async (): Promise<AccountInfo> => {
  const { data } = await axiosInstance.get<AccountApiResponse>('/api/members/me/accounts');
  return data.data;
};
