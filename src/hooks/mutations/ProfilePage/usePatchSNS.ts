import { patchSNS } from '@/apis/ProfilePage/sns';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import type { RequestPatchSNSDto } from '@/types/ProfilePage/sns';
import { useMutation } from '@tanstack/react-query';

function usePatchSNS({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ sns_id, url, description }: { sns_id: number } & RequestPatchSNSDto) =>
      patchSNS({ sns_id, url, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-sns', member_id],
      });
    },
  });
}

export default usePatchSNS;
