import { useQuery } from '@tanstack/react-query';
import { getBusinessSellerDetail } from '@apis/AdminPage/seller.ts';

function useGetBusinessSellerDetail(userId: number) {
  return useQuery({
    queryKey: ['businessSellerDetail', userId],
    queryFn: () => getBusinessSellerDetail(userId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetBusinessSellerDetail;
