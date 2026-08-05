import { patchDeleteTipAdmin } from '@/apis/AdminPage/tip';
import { useMutation } from '@tanstack/react-query';

function usePatchDeleteTipAdmin() {
  return useMutation({
    mutationFn: (tip_id: number) => patchDeleteTipAdmin(tip_id),
  });
}

export default usePatchDeleteTipAdmin;
