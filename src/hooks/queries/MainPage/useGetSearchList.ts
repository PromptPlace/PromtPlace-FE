import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getSearchPromptList } from '@/apis/MainPage/prompt';
import type { ResponsePromptDTO } from '@/types/MainPage/prompt';

import type { RequestSearchPrompt } from '@/types/MainPage/prompt';

function useGetSearchPromptList(params: RequestSearchPrompt) {
  return useQuery<ResponsePromptDTO>({
    queryKey: [QUERY_KEY.searchpromptList, params],
    queryFn: () => getSearchPromptList(params),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
  });
}

export default useGetSearchPromptList;
