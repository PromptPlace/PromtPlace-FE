import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { postSearchPromptList } from '@/apis/MainPage/prompt';

export const usePostSearchPromptList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSearchPromptList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.searchpromptList],
      });
    },

    onError: (error) => {
      console.error('검색 실패:', error);
    },
  });
};

export default usePostSearchPromptList;
