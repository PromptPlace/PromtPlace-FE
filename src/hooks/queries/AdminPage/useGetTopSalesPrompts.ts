import { useQuery } from '@tanstack/react-query';
import { getTopSalesPrompts } from '@apis/AdminPage/dashboard.ts';

function useGetTopSalesPrompts() {
  return useQuery({
    queryKey: ['topSalesPrompts'],
    queryFn: () => getTopSalesPrompts(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetTopSalesPrompts;
