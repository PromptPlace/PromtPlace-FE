import { useQuery } from '@tanstack/react-query';
import type { SellersRequestParams } from '@/types/AdminPage/seller.ts';
import { getBusinessSellers } from '@apis/AdminPage/seller.ts';

interface UseGetBusinessSellersProps {
  params?: SellersRequestParams;
  enabled?: boolean;
}

function useGetBusinessSellers({ params, enabled }: UseGetBusinessSellersProps = {}) {
  return useQuery({
    queryKey: ['businessSellers', params],
    queryFn: () => getBusinessSellers(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetBusinessSellers;
