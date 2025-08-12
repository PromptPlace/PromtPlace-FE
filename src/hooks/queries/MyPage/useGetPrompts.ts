import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { getDownloadedPrompts, getLikedPrompts } from '@/apis/MyPage/prompt.ts';
import type { ApiResponse, DownloadedPromptDTO, LikedPromptDTO } from '@/types/MyPage/prompt.ts';
import type { AxiosError } from 'axios';

// 쿼리 키를 상수로 관리하면 오타를 방지하고 일관성을 유지할 수 있습니다.
export const QUERY_KEY = {
  downloadedPrompts: ['prompts', 'downloaded'],
  likedPrompts: ['prompts', 'liked'],
};

type UseGetDownloadedPromptsOptions = Omit<
  UseQueryOptions<ApiResponse<DownloadedPromptDTO>, AxiosError>,
  'queryKey' | 'queryFn'
>;

type UseGetLikedPromptsOptions = Omit<UseQueryOptions<ApiResponse<LikedPromptDTO>, AxiosError>, 'queryKey' | 'queryFn'>;

export const useGetDownloadedPrompts = (options?: UseGetDownloadedPromptsOptions) => {
  return useQuery<ApiResponse<DownloadedPromptDTO>, AxiosError>({
    queryKey: QUERY_KEY.downloadedPrompts,
    queryFn: getDownloadedPrompts,
    ...options,
  });
};

export const useGetLikedPrompts = (options?: UseGetLikedPromptsOptions) => {
  return useQuery<ApiResponse<LikedPromptDTO>, AxiosError>({
    queryKey: QUERY_KEY.likedPrompts,
    queryFn: getLikedPrompts,
    ...options,
  });
};
