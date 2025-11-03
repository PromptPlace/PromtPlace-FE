import { useMutation } from '@tanstack/react-query';
import { postResetPasswordEmailAuthCode } from '@/apis/Login/auth';

const useRequestResetPasswordAuthCode = () => {
  return useMutation({
    mutationFn: (email: string) => postResetPasswordEmailAuthCode(email),

    onError: (error) => {
      console.error('비밀번호 변경 이메일 인증번호 요청 실패:', error);
    },
  });
};

export default useRequestResetPasswordAuthCode;
