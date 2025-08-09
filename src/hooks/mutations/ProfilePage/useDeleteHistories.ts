import { deleteHistory } from '@/apis/ProfilePage/history';
import { queryClient } from '@/App';
import type { RequestDeleteHistoryDto } from '@/types/ProfilePage/history';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function useDeleteHistories({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ history_id }: RequestDeleteHistoryDto) => deleteHistory({ history_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-history', member_id],
      });
    },
  });
}

export default useDeleteHistories;
