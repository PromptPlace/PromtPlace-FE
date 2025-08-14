import { useMutation } from '@tanstack/react-query';
import { updateReview } from '@/apis/PromptDetailPage/reviews';
import type { RequestUpdateReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';

type Vars = { reviewId: number; body: RequestUpdateReviewDto };

export default function useUpdateReview() {
  return useMutation({
    mutationFn: ({ reviewId, body }: Vars) => updateReview(reviewId, body),
  });
}
