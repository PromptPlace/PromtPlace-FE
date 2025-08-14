import { axiosInstance } from '@/apis/axios';
import type { AccountInfo, AccountApiResponse, RegisterInfo, UpdateAccountInfo, WithdrawableAmountApiResponse } from '@/types/MyPage/account'; // 타입 파일 경로

export const getAccountInfo = async (): Promise<AccountInfo> => {
  const { data } = await axiosInstance.get<AccountApiResponse>('/api/members/me/accounts');
  return data.data;
};

export const registerAccountInfo = async (accountData: RegisterInfo) => {
  const { data } = await axiosInstance.post('/api/members/me/accounts', accountData);
  return data;
};

export const updateAccountInfo = async (accountData: UpdateAccountInfo) => {
  const { data } = await axiosInstance.patch('/api/members/me/accounts', accountData);
  return data;
};


export const requestWithdrawal = async (amount: number) => {
  const { data } = await axiosInstance.post('/api/settlements/withdrawals', { amount });
  return data;
};


export const getWithdrawableAmount = async (): Promise<number> => {
  const { data } = await axiosInstance.get<WithdrawableAmountApiResponse>(
    '/api/settlements/withdrawals/available'
  );
  
  // 응답 객체에서 available_amount 숫자 값만 추출하여 반환
  return data.available_amount; 
};
