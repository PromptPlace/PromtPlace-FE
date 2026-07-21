import { useQuery } from '@tanstack/react-query';
import { getIndividualSellerDetail } from '@apis/AdminPage/seller.ts';

function useGetIndividualSellerDetail(userId: number) {
  return useQuery({
    queryKey: ['individualSellerDetail', userId],
    queryFn: () => getIndividualSellerDetail(userId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetIndividualSellerDetail;
