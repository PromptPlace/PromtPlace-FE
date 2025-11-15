import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/apis/PromptDetailPage/reviews';

export default function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['myDownloadedPrompts'] });
    },
  });
}
