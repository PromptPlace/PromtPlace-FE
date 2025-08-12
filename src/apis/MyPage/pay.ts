import type { SalesHistoryApiResponse, PurchaseHistoryApiResponse } from '@/types/MyPage/pay.ts';
import { axiosInstance } from '@/apis/axios.ts';

export const getSalesHistory = async (): Promise<SalesHistoryApiResponse> => {
  const { data } = await axiosInstance.get<SalesHistoryApiResponse>(`/api/settlements/sales`);
  return data;
};

export const getPurchaseHistory = async (): Promise<PurchaseHistoryApiResponse> => {
  const { data } = await axiosInstance.get<PurchaseHistoryApiResponse>(`/api/purchases`);
  return data;
};
