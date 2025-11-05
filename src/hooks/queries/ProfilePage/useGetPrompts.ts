import { getPrompts } from '@/apis/ProfilePage/profile';
import type { RequestMemberDto, ResponsePromptsDto } from '@/types/ProfilePage/profile';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetPrompts({ member_id }: RequestMemberDto) {
  return useInfiniteQuery({
    queryKey: ['member-prompts', member_id],
    queryFn: ({ pageParam }) => getPrompts({ member_id }, { cursor: pageParam, limit: 10 }),
    getNextPageParam: (lastPage: ResponsePromptsDto) =>
      lastPage?.data?.pagination?.has_more ? lastPage?.data?.pagination?.nextCursor : undefined,
    initialPageParam: undefined,
    staleTime: Infinity,
  });
}

export default useGetPrompts;
