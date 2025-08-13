import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getPromptList } from '@/apis/MainPage/prompt';
import type { ResponsePromptDTO } from '@/types/MainPage/prompt';

function useGetPromptList() {
  return useQuery<ResponsePromptDTO>({
    queryKey: [QUERY_KEY.prompts],
    queryFn: () => getPromptList(),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}

export default useGetPromptList;
