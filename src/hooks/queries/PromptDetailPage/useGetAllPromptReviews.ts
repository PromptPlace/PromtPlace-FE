import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getAllPromptReviews } from '@/apis/PromptDetailPage/reviews';
import type { PromptReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';

export const reviewKeys = {
  all: ['reviews'] as const,
  allForPrompt: (id: number) => [...reviewKeys.all, 'all', id] as const,
};

type Options = { enabled?: boolean; perPage?: number };

type HttpError = AxiosError<{ message?: string; code?: string }>;

export default function useGetAllPromptReviews(promptId: number, options?: Options) {
  const perPage = options?.perPage ?? 50;

  return useQuery<PromptReviewDto[], HttpError>({
    queryKey: reviewKeys.allForPrompt(promptId),
    queryFn: () => getAllPromptReviews(promptId, perPage),
    enabled: options?.enabled ?? !!promptId,
    staleTime: 60_000,
    retry: (count, err) => (err.response?.status ?? 0) !== 404 && count < 2,
  });
}
