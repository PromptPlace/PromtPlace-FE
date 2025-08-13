import { useMutation } from '@tanstack/react-query';
import { updateReview } from '@/apis/PromptDetailPage/reviews';
import type { RequestUpdateReviewDto } from '@/types/PromptDetailPage/ReviewDto';

type Vars = { reviewId: number; body: RequestUpdateReviewDto };

export default function useUpdateReview() {
  return useMutation({
    mutationFn: ({ reviewId, body }: Vars) => updateReview(reviewId, body),
  });
}
