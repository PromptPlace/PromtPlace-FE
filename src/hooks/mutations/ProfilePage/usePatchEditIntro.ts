import { patchIntro } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestIntroDto, RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePatchEditIntro({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ intro }: RequestIntroDto) => patchIntro({ intro }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member', member_id],
      });
    },
  });
}

export default usePatchEditIntro;
