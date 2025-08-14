import { useQuery } from '@tanstack/react-query';
import { getAccountInfo,getWithdrawableAmount } from '@apis/MyPage/account';
import type { AccountInfo } from '@/types/MyPage/account';
import { AxiosError } from 'axios';

export const useGetAccountInfo = () => {
  return useQuery<AccountInfo, AxiosError>({
    queryKey: ['myAccountInfo'],
    queryFn: getAccountInfo,
  });
};


export const useGetWithdrawableAmount = () => {
  return useQuery<number, AxiosError>({
    // 이 데이터를 식별하는 고유한 키
    queryKey: ['withdrawableAmount'], 
    // 데이터를 가져올 API 함수
    queryFn: getWithdrawableAmount,
  });
};