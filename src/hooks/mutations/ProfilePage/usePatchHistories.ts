import { patchEditHistory } from '@/apis/ProfilePage/history';
import { queryClient } from '@/App';
import type { RequestEditHistoryDto } from '@/types/ProfilePage/history';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePatchHistories({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ history_id, history }: RequestEditHistoryDto) => patchEditHistory({ history_id, history }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['history_history', member_id],
      });
    },
  });
}

export default usePatchHistories;
