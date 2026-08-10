import { useQuery } from '@tanstack/react-query';
import type { SellersRequestParams } from '@/types/AdminPage/seller.ts';
import { getIndividualSellers } from '@apis/AdminPage/seller.ts';

interface UseGetIndividualSellersProps {
  params?: SellersRequestParams;
  enabled?: boolean;
}

function useGetIndividualSellers({ params, enabled }: UseGetIndividualSellersProps = {}) {
  return useQuery({
    queryKey: ['individualSellers', params],
    queryFn: () => getIndividualSellers(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetIndividualSellers;
