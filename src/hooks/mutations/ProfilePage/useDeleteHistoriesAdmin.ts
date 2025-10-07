import { deleteHistoriesAdmin } from '@/apis/ProfilePage/admin';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function useDeleteHistoriesAdmin({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ history_id }: { history_id: number }) => deleteHistoriesAdmin({ history_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-history', member_id],
      });
    },
  });
}

export default useDeleteHistoriesAdmin;
