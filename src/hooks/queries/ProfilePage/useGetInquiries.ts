import { getInquiries } from '@/apis/ProfilePage/inquiry';
import type { RequestGetInquiriesDto } from '@/types/ProfilePage/inquiry';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetInquiries({ member_id }: RequestMemberDto, { type }: RequestGetInquiriesDto) {
  return useQuery({
    queryKey: ['member-inquiry', member_id],
    queryFn: () => getInquiries({ type }),
  });
}

export default useGetInquiries;
