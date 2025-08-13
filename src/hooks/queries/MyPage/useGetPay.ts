import { useQuery } from '@tanstack/react-query';
import { getSalesHistory, getPurchaseHistory } from '@/apis/MyPage/pay.ts';
import type { SalesHistoryApiResponse, PurchaseHistoryApiResponse } from '@/types/MyPage/pay.ts';
import type { AxiosError } from 'axios';

export const useGetSalesHistory = () => {
  return useQuery<SalesHistoryApiResponse, AxiosError>({
    queryKey: ['salesHistory'],
    queryFn: getSalesHistory,
  });
};

export const useGetPurchaseHistory = () => {
  return useQuery<PurchaseHistoryApiResponse, AxiosError>({
    queryKey: ['purchaseHistory'],
    queryFn: getPurchaseHistory,
  });
};
