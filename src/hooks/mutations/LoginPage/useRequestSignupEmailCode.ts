import { useMutation } from '@tanstack/react-query';
import { postSignupEmailAuthCode } from '@/apis/Login/auth';

export const useRequestSignupEmailCode = () => {
  return useMutation({
    mutationFn: (email: string) => postSignupEmailAuthCode(email),
    onError: (error) => {
      console.error('이메일 인증 요청 실패:', error);
    },
  });
};

export default useRequestSignupEmailCode;
