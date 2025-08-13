import { useQuery } from '@tanstack/react-query';
import { getAccountInfo } from '@apis/MyPage/account';
import type { AccountInfo } from '@/types/MyPage/account';
import { AxiosError } from 'axios';

export const useGetAccountInfo = () => {
  return useQuery<AccountInfo, AxiosError>({
    queryKey: ['myAccountInfo'],
    queryFn: getAccountInfo,
  });
};
