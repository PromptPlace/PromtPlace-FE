import { useQuery } from '@tanstack/react-query';
import { getYearlySales } from '@apis/MyPage/settlement.ts';

function useGetYearlySettlement() {
  return useQuery({
    queryKey: ['yearlySettlement'],
    queryFn: () => getYearlySales(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetYearlySettlement;
