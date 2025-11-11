import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPrompts } from '@apis/MyPage/prompt';
import { useAuth } from '@/context/AuthContext';
import type { NewAuthoredPromptsApiResponse } from '@/types/MyPage/prompt';
/**
 * 작성한 프롬프트 목록을 불러오는 커스텀 훅
 */
export const useGetMyPrompts = () => {
  const { user } = useAuth();
  const member_id = user.user_id;

  return useInfiniteQuery({
    queryKey: ['member-prompts', member_id, 'my-prompts'],

    queryFn: ({ pageParam }) => getMyPrompts({ pageParam: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage?.data?.pagination?.has_more ? lastPage.data.pagination.nextCursor : undefined;
    },

    select: (data) => {
      console.log('useGetMyPrompts data:', data);
      return {
        prompts: data.pages.flatMap((page) => page?.data?.prompts || []),
        pageParams: data.pageParams,
      };
    },
  });
};
