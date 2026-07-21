import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postIndividualRegister } from '@apis/MyPage/settlement.ts';

function usePostIndividualRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postIndividualRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settlementAccount'] });
      queryClient.invalidateQueries({ queryKey: ['settlementAccountDetail'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default usePostIndividualRegister;
