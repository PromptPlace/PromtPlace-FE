import { deletePromptAdmin } from '@/apis/ProfilePage/admin';
import { queryClient } from '@/App';
import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function useDeletePromptAdmin({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ prompt_id }: { prompt_id: number }) => deletePromptAdmin({ prompt_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-prompts', member_id],
      });
    },
  });
}

export default useDeletePromptAdmin;
