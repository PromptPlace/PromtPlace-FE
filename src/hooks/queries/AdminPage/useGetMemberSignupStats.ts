import { useQuery } from '@tanstack/react-query';
import { getMemberSignupStats } from '@apis/AdminPage/dashboard.ts';

function useGetMemberSignupStats() {
  return useQuery({
    queryKey: ['memberSignupStats'],
    queryFn: () => getMemberSignupStats(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetMemberSignupStats;
