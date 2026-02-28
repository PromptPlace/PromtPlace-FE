import { patchEditPrompt } from '@/apis/PromptCreatePage/edit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useEditPrompt(promptId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchEditPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['prompt', 'detail', promptId],
      });
    },
  });
}

export default useEditPrompt;
