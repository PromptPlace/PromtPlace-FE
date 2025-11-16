import { axiosInstance } from '@/apis/axios';
import type { AxiosResponse } from 'axios';
import type { NewLikedPromptResponse } from '@/types/MyPage/prompt';
import type { CommonResponse } from '@/types/common';

type Msg = { message: string; statusCode?: number };

export const likePrompt = (promptId: number): Promise<AxiosResponse<Msg>> =>
  axiosInstance.post(`/api/prompts/${promptId}/likes`);

export const unlikePrompt = (promptId: number): Promise<AxiosResponse<Msg>> =>
  axiosInstance.delete(`/api/prompts/${promptId}/likes`);

export type LikedPromptRow = { prompt_id: number; title: string };

{
  /*
export const getMyLikedPrompts = async (): Promise<LikedPromptRow[]> => {
  const { data } = await axiosInstance.get<{ data: LikedPromptRow[] }>('/api/prompts/likes');
  return data.data ?? [];
};

*/
}

export const getMyLikedPrompts = async () => {
  const { data } = await axiosInstance.get<NewLikedPromptResponse>('/api/prompts/likes');
  //받은 데이터를 LikedPromptRow[] 형태로 변환
  return (
    data.data.data.map((item) => ({
      prompt_id: item.prompt_id,
      title: item.title,
    })) ?? []
  );
};
