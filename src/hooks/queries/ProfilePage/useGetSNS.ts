import { getSNS } from '@/apis/ProfilePage/sns';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetSNS({ member_id }: RequestMemberDto) {
  return useQuery({
    queryKey: ['member-sns', member_id],
    queryFn: () => getSNS({ member_id }),
    staleTime: Infinity,
  });
}

export default useGetSNS;
