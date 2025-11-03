import { useMutation } from '@tanstack/react-query';
import { postSignup } from '@/apis/Login/auth';
import type { signupRequest } from '@/types/LoginPage/auth';

const useSignUpRequest = () => {
  return useMutation({
    mutationFn: (data: signupRequest) => postSignup(data),
    onError: (error) => {
      console.error('회원가입 인증번호 요청 실패:', error);
    },
  });
};

export default useSignUpRequest;
