import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { unlikePrompt } from '@/apis/PromptDetailPage/likes';
import { queryClient } from '@/App';
import { QUERY_KEY } from '@/hooks/queries/MyPage/useGetPrompts';
import { likedKeys } from '@/hooks/queries/PromptDetailPage/useMyLikedPrompts';

type HttpError = AxiosError<{ message?: string; code?: string }>;

export default function usePromptUnlike() {
  return useMutation<void, HttpError, number>({
    mutationFn: async (promptId) => {
      await unlikePrompt(promptId);
    },
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.likedPrompts,
      });
      // also invalidate the liked-prompts key used by other components
      queryClient.invalidateQueries({ queryKey: likedKeys.all });
    },
  });
}
