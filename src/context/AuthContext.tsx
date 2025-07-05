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
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

/* eslint-disable @typescript-eslint/no-unused-vars */
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

  const login = async () => {
    // 추후 구현
  };
  const logout = async () => {
    // 추후 구현
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
