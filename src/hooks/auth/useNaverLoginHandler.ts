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
export const handleNaverLogin = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.VITE_SOCIAL_CALLBACK_URL;
  sessionStorage.setItem('login_provider', 'naver');
const state = 'RANDOM_STRING';
sessionStorage.setItem('naver_state', state);

    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true, // 팝업으로 로그인 진행
      loginButton: { color: 'green', type: 3, height: 60 },
    });
    naverLogin.init();
  };
  
