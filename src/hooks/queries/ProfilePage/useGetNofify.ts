import { getNofity } from '@/apis/ProfilePage/profile';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useQuery } from '@tanstack/react-query';

function useGetNofify({ member_id }: RequestMemberDto) {
  return useQuery({
    queryKey: ['member-notification', member_id],
    queryFn: () => getNofity({ prompter_id: member_id }),
    staleTime: Infinity,
  });
}

export default useGetNofify;
