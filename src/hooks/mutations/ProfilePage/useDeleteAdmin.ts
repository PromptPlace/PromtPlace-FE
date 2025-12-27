import { deleteAdmin } from '@/apis/ProfilePage/admin';
import { useMutation } from '@tanstack/react-query';

function useDeleteAdmin() {
  return useMutation({
    mutationFn: deleteAdmin,
  });
}

export default useDeleteAdmin;
