import { getFollowing } from '@/apis/ProfilePage/profile';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetFollowing({ member_id }: RequestMemberDto) {
  return useQuery({
    queryKey: ['member-following', member_id],
    queryFn: () => getFollowing({ member_id }),
    staleTime: 0, // 언팔로우시 invalidateQueries
  });
}

export default useGetFollowing;
