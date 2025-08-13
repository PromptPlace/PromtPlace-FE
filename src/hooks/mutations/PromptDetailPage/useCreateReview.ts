import { useMutation } from '@tanstack/react-query';
import { createReview } from '@/apis/PromptDetailPage/reviews';
import type { RequestCreateReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';

interface Vars {
  promptId: number;
  body: RequestCreateReviewDto;
}

export default function useCreateReview() {
  return useMutation({
    mutationFn: ({ promptId, body }: Vars) => createReview(promptId, body),
  });
}
