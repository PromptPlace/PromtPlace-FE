import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { postSearchPromptList } from '@/apis/MainPage/prompt';
import type { ResponsePromptDTO } from '@/types/MainPage/prompt';

import type { RequestSearchPrompt } from '@/types/MainPage/prompt';

function useGetSearchPromptList(params: RequestSearchPrompt, enabled: boolean) {
  return useQuery<ResponsePromptDTO>({
    queryKey: [QUERY_KEY.searchpromptList, params],
    queryFn: () => postSearchPromptList(params),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
    enabled,
  });
}

export default useGetSearchPromptList;
