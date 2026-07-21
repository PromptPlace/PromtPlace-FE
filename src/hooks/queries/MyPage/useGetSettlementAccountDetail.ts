import { useQuery } from '@tanstack/react-query';
import { getAdjustmentDetail } from '@apis/MyPage/settlement.ts';

function useGetSettlementAccountDetail() {
  return useQuery({
    queryKey: ['settlementAccountDetail'],
    queryFn: () => getAdjustmentDetail(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetSettlementAccountDetail;
