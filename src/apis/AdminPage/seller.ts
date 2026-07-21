import type {
  PendingSellersRequestParams,
  PendingSellerListResponse,
  PendingSellerDetailResponse,
  RejectPendingSellerResponse,
  ApprovePendingSellerResponse,
  SellersRequestParams,
  IndividualSellerListResponse,
  BusinessSellerListResponse,
  IndividualSellerDetailResponse,
  BusinessSellerDetailResponse,
  CancelSellerResponse,
} from '@/types/AdminPage/seller.ts';
import { axiosInstance } from '@apis/axios.ts';

export const getPendingSellers = async (params?: PendingSellersRequestParams): Promise<PendingSellerListResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/pending`, {
    params,
  });

  return data;
};

export const getPendingSellerDetail = async (userId: number): Promise<PendingSellerDetailResponse> => {
  const { data } = await axiosInstance.get(
    `${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/pending/${userId}`,
  );

  return data;
};

export const rejectPendingSeller = async (userId: number): Promise<RejectPendingSellerResponse> => {
  const { data } = await axiosInstance.delete(
    `${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/pending/${userId}`,
  );

  return data;
};

export const approvePendingSeller = async (userId: number): Promise<ApprovePendingSellerResponse> => {
  const { data } = await axiosInstance.patch(
    `${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/pending/${userId}/approve`,
  );

  return data;
};

export const getIndividualSellers = async (params?: SellersRequestParams): Promise<IndividualSellerListResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/individual`, {
    params,
  });

  return data;
};

export const getBusinessSellers = async (params?: SellersRequestParams): Promise<BusinessSellerListResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/business`, {
    params,
  });

  return data;
};

export const getIndividualSellerDetail = async (userId: number): Promise<IndividualSellerDetailResponse> => {
  const { data } = await axiosInstance.get(
    `${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/individual/${userId}`,
  );

  return data;
};

export const getBusinessSellerDetail = async (userId: number): Promise<BusinessSellerDetailResponse> => {
  const { data } = await axiosInstance.get(
    `${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/business/${userId}`,
  );

  return data;
};

export const cancelSellerRegistration = async (userId: number): Promise<CancelSellerResponse> => {
  const { data } = await axiosInstance.delete(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/sellers/${userId}`);

  return data;
};
