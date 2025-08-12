import { getDetailInquiries } from '@/apis/ProfilePage/inquiry';
import type { RequestGetDetailInquiriesDto } from '@/types/ProfilePage/inquiry';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetDetailInquiries({ member_id }: RequestMemberDto, { inquiry_id }: RequestGetDetailInquiriesDto) {
  return useQuery({
    queryKey: ['member-inquiry', member_id],
    queryFn: () => getDetailInquiries({ inquiry_id }),
  });
}

export default useGetDetailInquiries;
