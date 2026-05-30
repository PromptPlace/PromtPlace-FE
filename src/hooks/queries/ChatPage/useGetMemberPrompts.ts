import { getMemberPrompts } from '@/apis/ChatPage/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetMemberPrompts(memberId: number) {
  return useInfiniteQuery({
    queryKey: ['member-promts', memberId],

    queryFn: ({ pageParam }) => getMemberPrompts({ memberId, cursor: pageParam }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.has_more) return undefined;

      return lastPage?.pagination.nextCursor;
    },
  });
}

export default useGetMemberPrompts;
