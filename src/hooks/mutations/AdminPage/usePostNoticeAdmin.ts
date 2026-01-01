import { postNoticeAdmin } from '@/apis/AdminPage/tip';
import { useMutation } from '@tanstack/react-query';

function usePostNoticeAdmin() {
  return useMutation({
    mutationFn: postNoticeAdmin,
  });
}

export default usePostNoticeAdmin;
