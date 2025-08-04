// Kakao SDK의 타입을 선언해줍니다.
declare global {
  interface Window {
    Kakao: any;
  }
}

/**
 * 카카오 로그인 로직을 처리하는 커스텀 훅입니다.
 * @returns {() => void} 카카오 로그인 시작 함수
 */
export const useKakaoLoginHandler = () => {
  const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  const KAKAO_CALLBACK_URL = import.meta.env.VITE_SOCIAL_CALLBACK_URL; // 통합 콜백 URL 사용

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }

    // SDK가 초기화되지 않았다면 초기화합니다.
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }

    // 카카오 로그인 페이지로 리디렉션합니다.
    window.Kakao.Auth.authorize({
      redirectUri: KAKAO_CALLBACK_URL,
    });
  };

  return handleKakaoLogin;
};
