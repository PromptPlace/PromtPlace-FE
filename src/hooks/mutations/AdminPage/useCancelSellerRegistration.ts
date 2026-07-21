import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelSellerRegistration } from '@apis/AdminPage/seller.ts';

function useCancelSellerRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => cancelSellerRegistration(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['individualSellers'] });
      queryClient.invalidateQueries({ queryKey: ['businessSellers'] });
      queryClient.invalidateQueries({ queryKey: ['individualSellerDetail', userId] });
      queryClient.invalidateQueries({ queryKey: ['businessSellerDetail', userId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useCancelSellerRegistration;
