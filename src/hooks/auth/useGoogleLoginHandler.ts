import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';

/**
 * 구글 로그인 로직을 처리하는 커스텀 훅입니다.
 * 인가 코드를 받아오는 useGoogleLogin 훅을 감싸고, 성공 시 AuthContext의 login 함수를 호출합니다.
 * 별도의 콜백 페이지 없이 현재는 react-oauth-google의 useGoogleLogin 훅을 사용합니다.
 * @returns {() => void} 구글 로그인 시작 함수
 */
export const useGoogleLoginHandler = () => {
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      login('google', codeResponse.code);
      console.log('✅ 구글 로그인 성공:', codeResponse.code);
    },
    onError: (error) => {
      console.error('❗️ 구글 로그인 실패', error);
    },
  });

  return handleGoogleLogin;
};
