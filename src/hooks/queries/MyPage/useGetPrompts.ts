import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getDownloadedPrompts, getAuthoredPrompts, getLikedPrompts } from '@/apis/MyPage/prompt.ts';
import type {
  ApiResponse,
  DownloadedPromptDTO,
  AuthoredPromptsApiResponse,
  LikedPromptDTO,
} from '@/types/MyPage/prompt.ts';
import type { AxiosError } from 'axios';
import type { PaginationDto } from '@/types/MyPage/common.ts';

// 쿼리 키를 상수로 관리하면 오타를 방지하고 일관성을 유지할 수 있습니다.
export const QUERY_KEY = {
  downloadedPrompts: ['prompts', 'downloaded'],
  likedPrompts: ['prompts', 'liked'],
};

type UseGetAuthoredPromptsOptions = Omit<
  UseInfiniteQueryOptions<
    AuthoredPromptsApiResponse, // TQueryFnData
    AxiosError, // TError
    InfiniteData<AuthoredPromptsApiResponse>,
    [string, number, PaginationDto], // TQueryKey
    number | undefined // TPageParam
  >,
  'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
>;

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

export const useGetAuthoredPrompts = (
  user_id: number,
  paginationOptions: PaginationDto,
  options?: UseGetAuthoredPromptsOptions,
) => {
  return useInfiniteQuery<
    AuthoredPromptsApiResponse, // TQueryFnData
    AxiosError, // TError
    InfiniteData<AuthoredPromptsApiResponse>, // TData
    [string, number, PaginationDto], // TQueryKey
    number | undefined // TPageParam
  >({
    queryKey: ['authoredPrompts', user_id, paginationOptions],
    queryFn: ({ pageParam }) =>
      getAuthoredPrompts({ user_id, pageParam: pageParam as number | undefined, options: paginationOptions }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: AuthoredPromptsApiResponse) => {
      return lastPage.data.pagination.has_more ? lastPage.data.pagination.nextCursor : undefined;
    },
    ...options,
  });
};
