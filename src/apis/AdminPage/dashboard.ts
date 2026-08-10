import type {
  MemberSignupStatsResponse,
  ActiveUserStatsResponse,
  VisitorStatsResponse,
  VisitorStatsRequestParams,
  NewPromptStatsResponse,
  TopSalesPromptsResponse,
  PopularPromptsResponse,
} from '@/types/AdminPage/dashboard.ts';
import { axiosInstance } from '@apis/axios.ts';

export const getMemberSignupStats = async (): Promise<MemberSignupStatsResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/stats/members`);

  return data;
};

export const getActiveUserStats = async (): Promise<ActiveUserStatsResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/stats/active-users`);

  return data;
};

export const getVisitorStats = async (params?: VisitorStatsRequestParams): Promise<VisitorStatsResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/stats/visitors`, {
    params,
  });

  return data;
};

export const getNewPromptStats = async (): Promise<NewPromptStatsResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/stats/prompts/new`);

  return data;
};

export const getTopSalesPrompts = async (): Promise<TopSalesPromptsResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/stats/prompts/top-sales`);

  return data;
};

export const getPopularPrompts = async (): Promise<PopularPromptsResponse> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/admin/stats/prompts/popular`);

  return data;
};
