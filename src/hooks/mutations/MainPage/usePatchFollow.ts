import { postFollow } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import { QUERY_KEY } from '@/constants/key';
import { useAuth } from '@/context/AuthContext';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePatchFollow() {
  const { user } = useAuth();
  return useMutation({
    mutationFn: ({ member_id }: RequestMemberDto) => postFollow({ member_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-following', user.user_id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.prompterList],
      });
    },
  });
}

export default usePatchFollow;
