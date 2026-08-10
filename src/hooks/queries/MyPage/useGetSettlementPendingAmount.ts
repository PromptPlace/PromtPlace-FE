import { useQuery } from '@tanstack/react-query';
import { getPendingAmount } from '@apis/MyPage/settlement.ts';

function useGetSettlementPendingAmount() {
  return useQuery({
    queryKey: ['settlementPendingAmount'],
    queryFn: () => getPendingAmount(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetSettlementPendingAmount;
