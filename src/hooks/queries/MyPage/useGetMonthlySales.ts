import { useQuery } from '@tanstack/react-query';
import type { MonthlySalesRequestDTO } from '@/types/MyPage/settlement.ts';
import { getMonthlySales } from '@apis/MyPage/settlement.ts';

interface UseGetMonthlySalesProps {
  params: MonthlySalesRequestDTO;
}

function useGetMonthlySales({ params }: UseGetMonthlySalesProps) {
  return useQuery({
    queryKey: ['monthlySales', params],
    queryFn: () => getMonthlySales(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetMonthlySales;
