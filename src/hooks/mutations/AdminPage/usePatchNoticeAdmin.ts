import { patchNoticeAdmin } from '@/apis/AdminPage/tip';
import { useMutation } from '@tanstack/react-query';

function usePatchNoticeAdmin() {
  return useMutation({
    mutationFn: patchNoticeAdmin,
  });
}

export default usePatchNoticeAdmin;
