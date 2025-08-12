import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unlikePrompt } from '@/apis/MyPage/prompt';

export const useUnlikePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', 'liked'] });
    },
    onError: (error) => {
      console.error('찜 취소에 실패했습니다:', error);
      alert('찜 취소 중 오류가 발생했습니다.');
    },
  });
};
