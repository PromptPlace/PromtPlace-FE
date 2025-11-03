import { postSNS } from '@/apis/ProfilePage/sns';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import type { RequestPostSNS } from '@/types/ProfilePage/sns';
import { useMutation } from '@tanstack/react-query';

function usePostSNS({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ url, description, user_sns_id }: RequestPostSNS) => postSNS({ url, description, user_sns_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-sns', member_id],
      });
    },
  });
}

export default usePostSNS;
