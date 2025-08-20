import { postNotifications } from '@/apis/ProfilePage/profile';
import { queryClient } from '@/App';
import type { RequestMemberDto, RequestNotificationsDto } from '@/types/ProfilePage/profile';
import { useMutation } from '@tanstack/react-query';

function usePostNotifications({ member_id }: RequestMemberDto) {
  return useMutation({
    mutationFn: ({ prompter_id }: RequestNotificationsDto) => postNotifications({ prompter_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['member-notification', member_id],
      });
    },
  });
}

export default usePostNotifications;
