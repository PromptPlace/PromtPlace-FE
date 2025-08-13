import { postReplyInquiries } from '@/apis/ProfilePage/inquiry';
import { queryClient } from '@/App';
import type { RequestGetDetailInquiriesDto, RequestReplyInquiriesDto } from '@/types/ProfilePage/inquiry';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePostReplyInquiries({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ inquiry_id, content }: RequestGetDetailInquiriesDto & RequestReplyInquiriesDto) =>
      postReplyInquiries({ inquiry_id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-inquiry', member_id],
      });
    },
  });
}

export default usePostReplyInquiries;
