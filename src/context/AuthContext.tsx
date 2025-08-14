import { LOCAL_STORAGE_KEY } from '@constants/key';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { postGoogleAuthCode, postNaverAuthCode } from '@apis/Login/auth.ts';
import type { User, loginResponseData } from '@/types/LoginPage/auth.ts';
import { axiosInstance } from '@/apis/axios.ts';

/**
 * TODO:
 * - interface login 매개변수 받는 부분 추후에 수정되어야 합니다.
 * - login과 logout 함수 추가 구현이 필요합니다.
 * - 남은 부분 구현 모두 완료되면 no-unused-vars 관련 주석 삭제해야 합니다.
 *
 * @author 김진효
 * **/

export const defaultUser: User = {
  user_id: -1,
  name: 'Guest',
  nickname: '게스트',
  email: '',
  social_type: 'NAVER',
  status: 'INACTIVE',
  role: 'USER',
  create_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

interface AuthContextType {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
  login: (provider: 'google' | 'kakao' | 'naver', authCode: string) => Promise<void>;
  logout: () => Promise<void>;
  switchAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getUserFromStorage,
    setItem: setUserInStorage,
    removeItem: removeUserFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.user);

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

  const [user, setUser] = useState<User>(() => getUserFromStorage() || defaultUser);
  console.log('AuthProvider user:', user.user_id);
  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  const login = async (provider: 'google' | 'kakao' | 'naver', authCode: string) => {
    try {
      const response = await (async () => {
        switch (provider) {
          case 'google':
            return postGoogleAuthCode(authCode);
          case 'naver':
            return postNaverAuthCode(authCode);
          case 'kakao':
            throw new Error('카카오 로그인은 아직 지원되지 않습니다.');
          default:
            throw new Error('지원하지 않는 소셜 로그인입니다.');
        }
      })();

      const loginData: loginResponseData = response.data;

      if (loginData) {
        const { access_token, refresh_token, user } = loginData;

        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setAccessTokenInStorage(access_token);
        setRefreshTokenInStorage(refresh_token);
        setUser(user);
        setUserInStorage(user);
        console.log(`[${provider}] 로그인 성공!`);
        alert(`환영합니다!`);
        console.log('user 정보:', user);
      }
    } catch (error) {
      console.error(`[${provider}] 백엔드 인증 과정 실패`, error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/api/auth/logout');
      console.log('서버 로그아웃 성공');
    } catch (error) {
      console.error('서버 로그아웃 요청 실패:', error);
    } finally {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      setUser(defaultUser);
    }

    window.location.href = '/'; // 로그아웃 후 메인 페이지로 이동
  };

  const switchAccount = async () => {
    try {
      await axiosInstance.get('/api/auth/logout');
      console.log('서버 로그아웃 성공');
    } catch (error) {
      console.error('서버 로그아웃 요청 실패:', error);
    } finally {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      setUser(defaultUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, switchAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
