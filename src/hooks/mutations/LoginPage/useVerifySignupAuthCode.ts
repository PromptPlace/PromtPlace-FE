import { useMutation } from '@tanstack/react-query';
import { postSignupVerifyCode } from '@/apis/Login/auth';
import type { signupVerifyCodeRequest } from '@/types/LoginPage/auth';

const useVerifySignupAuthCode = () => {
  return useMutation({
    mutationFn: (data: signupVerifyCodeRequest) => postSignupVerifyCode(data),
    onError: (error) => {
      console.error('회원가입 인증번호 확인 실패:', error);
    },
  });
};

export default useVerifySignupAuthCode;
