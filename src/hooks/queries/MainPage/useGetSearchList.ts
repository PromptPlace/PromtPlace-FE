import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { postSearchPromptList } from '@/apis/MainPage/prompt';
import type { ResponseSearchPromptDTO, SearchPromptDto } from '@/types/MainPage/prompt';
import type { RequestSearchPrompt } from '@/types/MainPage/prompt';

function useGetSearchPromptList(params: RequestSearchPrompt, enabled: boolean) {
  // model 변환 (RequestSearchPrompt → SearchPromptDto)
  const formattedParams: SearchPromptDto = {
    ...params,
    model: Array.isArray(params.model) ? params.model : params.model ? [params.model] : null,
    tag: params.tag !== undefined ? params.tag : null,
    keyword: params.keyword !== undefined ? params.keyword : null,
  };

  return useQuery<ResponseSearchPromptDTO>({
    queryKey: [QUERY_KEY.searchpromptList, formattedParams],
    queryFn: () => postSearchPromptList(formattedParams),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 10,
    enabled,
  });
}

export default useGetSearchPromptList;
