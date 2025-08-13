import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { likePrompt } from '@/apis/PromptDetailPage/likes';

type HttpError = AxiosError<{ message?: string; code?: string }>;

export default function usePromptLike() {
  return useMutation<void, HttpError, number>({
    mutationFn: async (promptId) => {
      await likePrompt(promptId);
    },
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
  });
}
