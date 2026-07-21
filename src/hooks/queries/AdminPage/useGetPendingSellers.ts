import { useQuery } from '@tanstack/react-query';
import type { PendingSellersRequestParams } from '@/types/AdminPage/seller.ts';
import { getPendingSellers } from '@apis/AdminPage/seller.ts';

interface UseGetPendingSellersProps {
  params?: PendingSellersRequestParams;
  enabled?: boolean;
}

function useGetPendingSellers({ params, enabled }: UseGetPendingSellersProps = {}) {
  return useQuery({
    queryKey: ['pendingSellers', params],
    queryFn: () => getPendingSellers(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetPendingSellers;
