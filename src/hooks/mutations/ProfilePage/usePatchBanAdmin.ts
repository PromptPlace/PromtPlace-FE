import { patchBanAdmin } from '@/apis/ProfilePage/admin';
import { useMutation } from '@tanstack/react-query';

function usePatchBanAdmin() {
  return useMutation({
    mutationFn: patchBanAdmin,
  });
}

export default usePatchBanAdmin;
