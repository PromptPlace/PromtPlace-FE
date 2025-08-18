import { deleteFollow } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function useDeleteFollow({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ member_id }: RequestMemberDto) => deleteFollow({ member_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-following', member_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['member-follower', member_id],
      });
    },
  });
}

export default useDeleteFollow;
