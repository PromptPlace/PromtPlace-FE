import { useMutation } from '@tanstack/react-query';
import { deleteReview } from '@/apis/PromptDetailPage/reviews';

export default function useDeleteReview() {
  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
  });
}
