import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getPromptList } from '@/apis/MainPage/prompt';
import type { PromptQueryState, ResponsePromptDTO } from '@/types/MainPage/prompt';

function useGetPromptList(queryParams?: PromptQueryState) {
  return useQuery<ResponsePromptDTO>({
    queryKey: [QUERY_KEY.prompts, queryParams],
    queryFn: () => getPromptList(queryParams),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}

export default useGetPromptList;
