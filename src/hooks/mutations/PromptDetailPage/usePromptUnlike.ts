import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { unlikePrompt } from '@/apis/PromptDetailPage/likes';

type HttpError = AxiosError<{ message?: string; code?: string }>;

export default function usePromptUnlike() {
  return useMutation<void, HttpError, number>({
    mutationFn: async (promptId) => {
      await unlikePrompt(promptId);
    },
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
  });
}
