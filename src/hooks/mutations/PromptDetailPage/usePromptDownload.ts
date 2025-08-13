import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getPromptDownload } from '@/apis/PromptDetailPage/promptDownload';
import type { PromptDownload } from '@/types/PromptDetailPage/PromptDownloadDto';

type HttpError = AxiosError<{ message?: string; code?: string }>;

export default function usePromptDownload() {
  return useMutation<PromptDownload, HttpError, number>({
    mutationFn: (promptId) => getPromptDownload(promptId),
    retry: (count, err) => (err.response?.status ?? 0) !== 404 && count < 1,
  });
}
