import { patchTipAdmin } from '@/apis/AdminPage/tip';
import { useMutation } from '@tanstack/react-query';

function usePatchTipAdmin() {
  return useMutation({
    mutationFn: patchTipAdmin,
  });
}

export default usePatchTipAdmin;
