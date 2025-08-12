import { patchEditMember } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestEditMemberDto, RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePatchEditMember({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ name, nickname, email }: RequestEditMemberDto) => patchEditMember({ name, nickname, email }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member', member_id],
      });
    },
  });
}

export default usePatchEditMember;
