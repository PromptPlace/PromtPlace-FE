import { useQuery } from '@tanstack/react-query';
import type { VisitorStatsRequestParams } from '@/types/AdminPage/dashboard.ts';
import { getVisitorStats } from '@apis/AdminPage/dashboard.ts';

interface UseGetVisitorStatsProps {
  params?: VisitorStatsRequestParams;
}

function useGetVisitorStats({ params }: UseGetVisitorStatsProps = {}) {
  return useQuery({
    queryKey: ['visitorStats', params],
    queryFn: () => getVisitorStats(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetVisitorStats;
