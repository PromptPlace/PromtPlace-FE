import { postMsgAdmin } from '@/apis/ProfilePage/admin';
import { useMutation } from '@tanstack/react-query';

function usePostMsgAdmin() {
  return useMutation({
    mutationFn: postMsgAdmin,
  });
}

export default usePostMsgAdmin;
