import { postIntro } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestIntroDto, RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePostEditIntro({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ intro }: RequestIntroDto) => postIntro({ intro }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member', member_id],
      });
    },
  });
}

export default usePostEditIntro;
