import { LOCAL_STORAGE_KEY } from '@constants/key';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

/**
 * TODO:
 * - interface login 매개변수 받는 부분 추후에 수정되어야 합니다.
 * - login과 logout 함수 추가 구현이 필요합니다.
 * - 남은 부분 구현 모두 완료되면 no-unused-vars 관련 주석 삭제해야 합니다.
 *
 * @author 김진효
 * **/

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (provider: 'google' | 'kakao' | 'naver', authCode: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  const login = async (provider: 'google' | 'kakao' | 'naver', authCode: string) => {
    try {
      // 1. 각 소셜 플랫폼에 로그인 요청 후 '인가 코드' 받기
      console.log(`[${provider}] 받은 인가 코드: ${authCode}`);

      // 2. 받은 '인가 코드'를 우리 백엔드 서버로 전송
      // const response = await authApi.post('/login/social', { provider, code: authCode });

      // 3. 우리 서버로부터 최종 accessToken과 refreshToken 받기
      // const { accessToken, refreshToken } = response.data;

      // --- (임시 더미 데이터 사용) ---
      const accessTokennnn = `${provider}_final_access_token`;
      const refreshTokennnn = `${provider}_final_refresh_token`;
      // -----------------------------

      // 4. 받은 토큰을 상태와 스토리지에 저장
      setAccessToken(accessTokennnn);
      setRefreshToken(refreshTokennnn);
      setAccessTokenInStorage(accessTokennnn);
      setRefreshTokenInStorage(refreshTokennnn);
    } catch (error) {
      console.error(`${provider} 로그인 전체 프로세스 실패`, error);
    }
  };

  const logout = async () => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    setAccessToken(null);
    setRefreshToken(null);
  };
  return <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
