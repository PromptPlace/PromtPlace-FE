import { postTipAdmin } from '@/apis/AdminPage/tip';
import { useMutation } from '@tanstack/react-query';

function usePostTipAdmin() {
  return useMutation({
    mutationFn: postTipAdmin,
  });
}

export default usePostTipAdmin;
