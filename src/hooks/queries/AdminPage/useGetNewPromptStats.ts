import { useQuery } from '@tanstack/react-query';
import { getNewPromptStats } from '@apis/AdminPage/dashboard.ts';

function useGetNewPromptStats() {
  return useQuery({
    queryKey: ['newPromptStats'],
    queryFn: () => getNewPromptStats(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetNewPromptStats;
