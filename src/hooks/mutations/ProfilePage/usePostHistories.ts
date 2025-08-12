import { postHistory } from '@/apis/ProfilePage/history';
import { queryClient } from '@/App';
import type { RequestHistoryDto } from '@/types/ProfilePage/history';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePostHistories({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ history }: RequestHistoryDto) => postHistory({ history }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-history', member_id],
      });
    },
  });
}

export default usePostHistories;
