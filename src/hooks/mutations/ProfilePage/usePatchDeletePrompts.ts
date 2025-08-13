import { deletePrompt } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestDeletePromptDto, RequestMemberDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePatchDeletePrompts({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ prompt_id }: RequestDeletePromptDto) => deletePrompt({ prompt_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-prompts', member_id],
      });
    },
  });
}

export default usePatchDeletePrompts;
