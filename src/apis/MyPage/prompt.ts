import { axiosInstance } from '@/apis/axios.ts';
import type {
  ApiResponse,
  DownloadedPromptDTO,
  LikedPromptDTO,
  AuthoredPromptsApiResponse,
} from '@/types/MyPage/prompt';
import type { PaginationDto } from '@/types/MyPage/common.ts';

export const getDownloadedPrompts = async (): Promise<ApiResponse<DownloadedPromptDTO>> => {
  const { data } = await axiosInstance.get<ApiResponse<DownloadedPromptDTO>>('/api/prompts/downloads');

  return data;
};

export const getLikedPrompts = async (): Promise<ApiResponse<LikedPromptDTO>> => {
  const { data } = await axiosInstance.get<ApiResponse<LikedPromptDTO>>('/api/prompts/likes');
  return data;
};

export const getAuthoredPrompts = async ({
  user_id,
  pageParam,
  options,
}: {
  user_id: number;
  pageParam: number | undefined; // pageParam은 다음 페이지의 커서 역할을 합니다.
  options: PaginationDto;
}) => {
  const url = `/api/members/${user_id}/prompts`;
  //option을 백엔드에서 명시한 것만 사용해야 에러가 안날것 같다는 생각
  const params = {
    ...options,
    cursor: pageParam, // pageParam을 cursor로 사용합니다.
  };

  // 2. axios의 params 옵션을 사용하여 요청합니다.
  const { data } = await axiosInstance.get<AuthoredPromptsApiResponse>(url, {
    params,
  });

  return data;
};

export const unlikePrompt = async (promptId: number) => {
  await axiosInstance.delete(`/api/prompts/${promptId}/likes`);
};
