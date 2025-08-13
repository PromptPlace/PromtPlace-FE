import { getFollower } from '@/apis/ProfilePage/profile';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetFollower({ member_id }: RequestMemberDto) {
  return useQuery({
    queryKey: ['member-follower', member_id],
    queryFn: () => getFollower({ member_id }),
  });
}

export default useGetFollower;
