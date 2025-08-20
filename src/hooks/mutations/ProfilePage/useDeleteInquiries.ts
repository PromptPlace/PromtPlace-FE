import { deleteInquiries } from '@/apis/ProfilePage/inquiry';
import { queryClient } from '@/App';
import type { RequestGetDetailInquiriesDto } from '@/types/ProfilePage/inquiry';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function useDeleteInquiries({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ inquiry_id }: RequestGetDetailInquiriesDto) => deleteInquiries({ inquiry_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-inquiry', member_id],
      });
    },
  });
}

export default useDeleteInquiries;
