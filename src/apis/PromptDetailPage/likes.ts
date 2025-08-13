import { axiosInstance } from '@/apis/axios';
import type { AxiosResponse } from 'axios';

type Msg = { message: string; statusCode?: number };

export const likePrompt = (promptId: number): Promise<AxiosResponse<Msg>> =>
  axiosInstance.post(`/api/prompts/${promptId}/likes`);

export const unlikePrompt = (promptId: number): Promise<AxiosResponse<Msg>> =>
  axiosInstance.delete(`/api/prompts/${promptId}/likes`);

export type LikedPromptRow = { prompt_id: number; title: string };

export const getMyLikedPrompts = async (): Promise<LikedPromptRow[]> => {
  const { data } = await axiosInstance.get<{ data: LikedPromptRow[] }>('/api/prompts/likes');
  return data.data ?? [];
};
