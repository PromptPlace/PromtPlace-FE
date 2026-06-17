import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postRefund } from '@/apis/MyPage/refund';

export const usePostRefund = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (purchaseId: number) => postRefund(purchaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDownloadedPrompts'] });
    },
  });
};
