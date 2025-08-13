import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getMyLikedPrompts } from '@/apis/PromptDetailPage/likes';

type HttpError = AxiosError<{ message?: string }>;

export const likedKeys = {
  all: ['liked-prompts'] as const,
};

export default function useMyLikedPrompts(enabled = true) {
  return useQuery<Set<number>, HttpError>({
    queryKey: likedKeys.all,
    queryFn: async () => {
      const rows = await getMyLikedPrompts();
      return new Set(rows.map((r) => r.prompt_id));
    },
    enabled,
    staleTime: 60_000,
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
  });
}
