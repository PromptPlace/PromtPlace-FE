import { getMyDownloadedPrompts } from '@/apis/MyPage/prompt.ts';
import { useQuery } from '@tanstack/react-query';
import type { NewDownloadedPromptsApiResponse } from '@/types/MyPage/prompt.ts';
import type { AxiosError } from 'axios';

const useGetMyDownloadedPrompts = () => {
  return useQuery<NewDownloadedPromptsApiResponse, AxiosError>({
    queryKey: ['myDownloadedPrompts'],
    queryFn: getMyDownloadedPrompts,
  });
};

export default useGetMyDownloadedPrompts;
