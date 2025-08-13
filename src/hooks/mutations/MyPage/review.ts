import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/apis/MyPage/review';

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview, // (reviewId) => deleteReview(reviewId)와 동일
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my', 'writtenReviews'] });
    },
    onError: (error) => {
      console.error('리뷰 삭제에 실패했습니다:', error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    },
  });
};
