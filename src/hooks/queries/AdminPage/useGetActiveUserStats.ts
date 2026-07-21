import { useQuery } from '@tanstack/react-query';
import { getActiveUserStats } from '@apis/AdminPage/dashboard.ts';

function useGetActiveUserStats() {
  return useQuery({
    queryKey: ['activeUserStats'],
    queryFn: () => getActiveUserStats(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetActiveUserStats;
