import { useQuery } from '@tanstack/react-query';
import { getSettlementAccount } from '@apis/MyPage/settlement.ts';

function useGetSettlementAccount() {
  return useQuery({
    queryKey: ['settlementAccount'],
    queryFn: () => getSettlementAccount(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetSettlementAccount;
