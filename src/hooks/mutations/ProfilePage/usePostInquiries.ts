import { postInquiries } from '@/apis/ProfilePage/inquiry';
import { queryClient } from '@/App';
import type { RequestInquiriesDto } from '@/types/ProfilePage/inquiry';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePostInquiries({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ receiver_id, type, title, content }: RequestInquiriesDto) =>
      postInquiries({ receiver_id, type, title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-inquiry', member_id],
      });
    },
  });
}

export default usePostInquiries;
