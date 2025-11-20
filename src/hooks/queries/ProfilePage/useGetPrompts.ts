import { getPrompts } from '@/apis/ProfilePage/profile';
import type { RequestMemberDto, ResponsePromptsDto } from '@/types/ProfilePage/profile';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetPrompts({ member_id }: RequestMemberDto) {
  return useInfiniteQuery<ResponsePromptsDto>({
    queryKey: ['member-prompts', member_id],
    // @ts-expect-error pageParam is inferred as unknown
    queryFn: ({ pageParam = undefined }) => getPrompts({ member_id }, { cursor: pageParam, limit: 50 }),
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.has_more ? (lastPage?.pagination?.nextCursor ?? undefined) : undefined,
    initialPageParam: undefined,
    staleTime: Infinity,
  });
}

export default useGetPrompts;
