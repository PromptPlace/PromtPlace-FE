import { useMutation } from '@tanstack/react-query';
import { postVerifyAccount } from '@apis/MyPage/settlement.ts';

function usePostVerifyAccount() {
  return useMutation({
    mutationFn: postVerifyAccount,
    onError: (error) => {
      console.error(error);
    },
  });
}

export default usePostVerifyAccount;
