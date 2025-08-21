import { deleteSNS } from '@/apis/ProfilePage/sns';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function useDeleteSNS({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ sns_id }: { sns_id: number }) => deleteSNS({ sns_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-sns', member_id],
      });
    },
  });
}

export default useDeleteSNS;