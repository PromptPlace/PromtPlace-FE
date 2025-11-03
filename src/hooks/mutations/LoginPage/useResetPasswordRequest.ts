import { useMutation } from '@tanstack/react-query';
import { postResetPassword } from '@/apis/Login/auth';
import type { resetPasswordRequest } from '@/types/LoginPage/auth';

const useResetPasswordRequest = () => {
  return useMutation({
    mutationFn: (data: resetPasswordRequest) => postResetPassword(data),
    onError: (error) => {
      console.error('비밀번호 변경 요청 실패:', error);
    },
  });
};

export default useResetPasswordRequest;
