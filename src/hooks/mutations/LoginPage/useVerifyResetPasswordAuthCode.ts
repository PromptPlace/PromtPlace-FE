import { useMutation } from '@tanstack/react-query';
import { postResetPasswordVerifyCode } from '@/apis/Login/auth';
import type { resetPasswordVerifyCodeRequest } from '@/types/LoginPage/auth';

const useVerifyResetPasswordAuthCode = () => {
  return useMutation({
    mutationFn: (data: resetPasswordVerifyCodeRequest) => postResetPasswordVerifyCode(data),
    onError: (error) => {
      console.error('비밀번호 재설정 인증번호 확인 실패:', error);
    },
  });
};

export default useVerifyResetPasswordAuthCode;
