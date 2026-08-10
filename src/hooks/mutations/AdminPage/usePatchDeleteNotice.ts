import { patchDeleteNoticeAdmin } from '@/apis/AdminPage/tip';
import { useMutation } from '@tanstack/react-query';

function usePatchDeleteNotice() {
  return useMutation({
    mutationFn: (announcement_id: number) => patchDeleteNoticeAdmin(announcement_id),
  });
}

export default usePatchDeleteNotice;
