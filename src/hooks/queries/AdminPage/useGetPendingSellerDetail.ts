import { useQuery } from '@tanstack/react-query';
import { getPendingSellerDetail } from '@apis/AdminPage/seller.ts';

function useGetPendingSellerDetail(userId: number) {
  return useQuery({
    queryKey: ['pendingSellerDetail', userId],
    queryFn: () => getPendingSellerDetail(userId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetPendingSellerDetail;
