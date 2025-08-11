import { LOCAL_STORAGE_KEY } from '@constants/key';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { postGoogleAuthCode, postNaverAuthCode } from '@apis/Login/auth.ts';
import type { User, loginResponseData } from '@/types/LoginPage/auth.ts';

/**
 * TODO:
 * - interface login 매개변수 받는 부분 추후에 수정되어야 합니다.
 * - login과 logout 함수 추가 구현이 필요합니다.
 * - 남은 부분 구현 모두 완료되면 no-unused-vars 관련 주석 삭제해야 합니다.
 *
 * @author 김진효
 * **/

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (provider: 'google' | 'kakao' | 'naver', authCode: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  const login = async (provider: 'google' | 'kakao' | 'naver', authCode: string) => {
    try {
      let response;

      switch (provider) {
        case 'google':
          response = await postGoogleAuthCode(authCode);
          break;
        case 'naver':
          response = await postNaverAuthCode(authCode);
          break;
        case 'kakao':
          // response = await loginWithKakao(authCode);
          // break;
          throw new Error('카카오 로그인은 아직 지원되지 않습니다.');
        default:
          throw new Error('지원하지 않는 소셜 로그인입니다.');
      }

      const loginData: loginResponseData = response.data;

      if (loginData) {
        const { access_token, refresh_token, user } = loginData;

        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setAccessTokenInStorage(access_token);
        setRefreshTokenInStorage(refresh_token);
        setUser(user);

        console.log(`[${provider}] 로그인 성공!`);
      }
    } catch (error) {
      console.error(`[${provider}] 백엔드 인증 과정 실패`, error);
    }
  };

  const logout = async () => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null); // 로그아웃 시 유저 정보도 초기화
    console.log('로그아웃 되었습니다.');
  };
  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
