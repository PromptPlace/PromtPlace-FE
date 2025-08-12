import { getHistory } from '@/apis/ProfilePage/history';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetHistories({ member_id }: RequestMemberDto) {
  return useQuery({
    queryKey: ['member-history', member_id],
    queryFn: () => getHistory({ member_id }),
    staleTime: Infinity,
  });
}

export default useGetHistories;
