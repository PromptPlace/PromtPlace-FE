import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPrompts } from '@apis/MyPage/prompt';

/**
 * 작성한 프롬프트 목록을 불러오는 커스텀 훅
 */
export const useGetMyPrompts = () => {
  return useInfiniteQuery({
    queryKey: ['myAuthoredPrompts'],

    queryFn: getMyPrompts,

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.has_more ? lastPage.data.nextCursor : undefined;
    },

    select: (data) => {
      return {
        prompts: data.pages.flatMap((page) => page.data.prompts),
        pageParams: data.pageParams,
      };
    },
  });
};
