import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { postSearchPromptList } from '@/apis/MainPage/prompt';

export const usePostSearchPromptList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSearchPromptList,
    onSuccess: (data) => {
      console.log('검색 성공', data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.searchpromptList] });
    },

    onError: (error) => {
      console.error('검색 실패:', error);
    },
  });
};

export default usePostSearchPromptList;
