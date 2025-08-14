import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

/**
 * accessToken이 없는 경우 로그인 모달을 띄워주는 훅입니다.
 * 로그인하지 않은 상태라면 로그인 모달,
 * 로그인된 상태라면 전달받은 콜백함수를 실행합니다.
 *
 * @returns {
 *    loginModalShow: boolean,  // 로그인 모달 표시 여부
 *    setLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>,  // 모달 상태 제어 함수
 *    handleShowLoginModal: (callback: () => void) => void,  // 로그인된 상태에 실행할 함수
 * }
 *
 * @example
 * const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();
 *
 * const handleFollow = () => {
 *   handleShowLoginModal(() => {
 *     setIsFollow((prev) => !prev); // 로그인된 경우 실행할 함수
 *   });
 * };
 *
 * <FollowButton follow={isFollow} onClick={handleFollow} size="lg" />
 *
 * {loginModalShow && (
 *   <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
 * )}
 *
 * @author 김진효
 * **/

export const useShowLoginModal = () => {
  const { accessToken } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleShowLoginModal = (callback: () => void) => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      setLoginModalShow(true);
    } else {
      callback();
    }
  };

  return { loginModalShow, setLoginModalShow, handleShowLoginModal };
};
