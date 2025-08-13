import { postImg } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestMemberDto, RequestPostImg } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePostImg({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ profile_image }: RequestPostImg) => postImg({ profile_image }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member', member_id],
      });
    },
  });
}

export default usePostImg;
