import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectPendingSeller } from '@apis/AdminPage/seller.ts';

function useRejectPendingSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => rejectPendingSeller(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['pendingSellers'] });
      queryClient.invalidateQueries({ queryKey: ['pendingSellerDetail', userId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useRejectPendingSeller;
