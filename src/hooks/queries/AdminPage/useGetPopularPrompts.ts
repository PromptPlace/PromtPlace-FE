import { useQuery } from '@tanstack/react-query';
import { getPopularPrompts } from '@apis/AdminPage/dashboard.ts';

function useGetPopularPrompts() {
  return useQuery({
    queryKey: ['popularPrompts'],
    queryFn: () => getPopularPrompts(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetPopularPrompts;
