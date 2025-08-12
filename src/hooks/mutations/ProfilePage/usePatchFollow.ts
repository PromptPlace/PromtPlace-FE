import { postFollow } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePatchFollow({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ member_id }: RequestMemberDto) => postFollow({ member_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-following', member_id],
      });
    },
  });
}

export default usePatchFollow;
