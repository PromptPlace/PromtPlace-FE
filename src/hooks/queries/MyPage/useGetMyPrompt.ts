import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPrompts } from '@apis/MyPage/prompt';
import { useAuth } from '@/context/AuthContext';
/**
 * 작성한 프롬프트 목록을 불러오는 커스텀 훅
 */
export const useGetMyPrompts = () => {
  const { user } = useAuth();
  const member_id = user.user_id;

  return useInfiniteQuery({
    queryKey: ['member-prompts', member_id],

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
