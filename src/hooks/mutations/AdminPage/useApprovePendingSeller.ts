import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approvePendingSeller } from '@apis/AdminPage/seller.ts';
import { getErrorMessage } from '@/utils/getErrorMessage.ts';

function useApprovePendingSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => approvePendingSeller(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['pendingSellers'] });
      queryClient.invalidateQueries({ queryKey: ['pendingSellerDetail', userId] });
      queryClient.invalidateQueries({ queryKey: ['businessSellers'] });
    },
    onError: (error) => {
      console.error(error);
      alert(getErrorMessage(error));
    },
  });
}

export default useApprovePendingSeller;
