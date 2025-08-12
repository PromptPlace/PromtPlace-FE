import { getMember } from '@/apis/ProfilePage/profile';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetMember({ member_id }: RequestMemberDto) {
  return useQuery({
    queryKey: ['member', member_id],
    queryFn: () => getMember({ member_id }),
    staleTime: Infinity, // 수정시 invalidateQueries
  });
}

export default useGetMember;
