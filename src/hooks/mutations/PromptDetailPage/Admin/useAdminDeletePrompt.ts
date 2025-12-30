import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAdminPrompt } from '@/apis/PromptDetailPage/admin/prompts';

type DeleteResponse = {
  message: string;
  data: null;
  statusCode: number;
};

const useAdminDeletePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteResponse, unknown, number>({
    mutationFn: (promptId: number) => deleteAdminPrompt(promptId),

    onSuccess: (_res, promptId) => {
      queryClient.removeQueries({ queryKey: ['promptDetail', promptId] });
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
    },
  });
};

export default useAdminDeletePrompt;
