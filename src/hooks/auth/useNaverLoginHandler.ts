import { useEffect } from 'react';

// Naver SDK 타입을 선언해줍니다.
declare global {
  interface Window {
    naver: any;
  }
}

/**
 * 네이버 로그인 로직을 처리하는 커스텀 훅입니다.
 * @returns {() => void} 네이버 로그인 시작 함수
 */
export const useNaverLoginHandler = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.VITE_SOCIAL_CALLBACK_URL;

  const initializeNaverLogin = () => {
    if (!window.naver) {
      console.error('네이버 SDK가 로드되지 않았습니다.');
      return;
    }

    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true, // 팝업으로 로그인 진행
      loginButton: { color: 'green', type: 3, height: 60 },
    });
    naverLogin.init();
  };

  // 컴포넌트 마운트 시 SDK를 초기화합니다.
  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleNaverLogin = () => {
    // id가 'naverIdLogin'인 버튼을 클릭하는 방식으로 로그인을 trigger합니다.
    // 이 버튼은 보이지 않게 숨겨둘 것입니다.
    const naverLoginButton = document.getElementById('naverIdLogin_loginButton');
    if (naverLoginButton) {
      naverLoginButton.click();
    } else {
      console.error('네이버 로그인 버튼을 찾을 수 없습니다.');
    }
  };

  return handleNaverLogin;
};
