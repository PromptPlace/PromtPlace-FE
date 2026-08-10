import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBusinessRegister } from '@apis/MyPage/settlement.ts';

function usePostBusinessRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBusinessRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settlementAccount'] });
      queryClient.invalidateQueries({ queryKey: ['settlementAccountDetail'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default usePostBusinessRegister;
