import PromptPlaceLogo from '@assets/logo/text/text-logo-login.svg';
import { Link } from 'react-router-dom';
import { useState, useLayoutEffect, useEffect } from 'react';
import exitIcon from '@assets/icon-exit.svg';
import LoginView from './components/loginView';
import SignupView from './components/signupView';
import ForgotPasswordView from './components/forgotPassword';
import ChangePasswordView from './components/changePassword';
import InitPasswordView from './components/initPassword';
import AgreeTermsView from './components/agreeTerms';
import type { ModalView } from '@/types/LoginPage/auth';
import OnBoardingView from './components/onBoarding';
/**
 * TODO:
 * - 소셜 로그인 버튼 hover/click 효과 추후 반영 필요
 *
 * @author 류동현
 * **/

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (provider: string) => void;
  initialView?: ModalView;
}

const SocialLoginModal = ({ isOpen, onClose, initialView = 'login' }: SocialLoginModalProps) => {
  const [view, setView] = useState<ModalView>(initialView);
  const [signupEmail, setsignUpEmail] = useState<string>('');
  const [signupPassword, setsignUpPassword] = useState<string>('');
  const [changePasswordtempToken, setChangePasswordtempToken] = useState<string>('');
  const [changePasswordEmail, setChangePasswordEmail] = useState<string>('');
  const [tempToken, setTempToken] = useState<string>('');
  //메인 모달

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  const [scale, setScale] = useState(1);
  const BASE_WIDTH = 656; // 👈 모달의 기본 너비(w-[656px])
  const BASE_HEIGHT = 850;
  const MIN_SCALE = 0.6;
  // 3. (✅ 추가) 윈도우 크기에 따라 scale 값을 계산하는 로직
  useLayoutEffect(() => {
    const handleResize = () => {
      const widthScale = (window.innerWidth - 40) / BASE_WIDTH;
      const heightScale = (window.innerHeight - 40) / BASE_HEIGHT;
      const base = Math.min(1, widthScale, heightScale); // 둘 중 더 작은 쪽 기준
      const newScale = Math.pow(base, 1.5); // ← 이 수치만 조절하면 됨
      const finalScale = Math.max(newScale, MIN_SCALE);
      setScale(finalScale);
    };

    // 처음 마운트될 때와 윈도우 크기가 바뀔 때 실행
    handleResize();
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 사라질 때 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []); // [] 빈 배열: 처음 한 번만 실행

  //뷰 렌더링함수
  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginView setView={setView} />;
      case 'signup':
        return (
          <SignupView
            setView={setView}
            email={signupEmail}
            setEmail={setsignUpEmail}
            tempToken={tempToken}
            setTempToken={setTempToken}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordView
            setView={setView}
            tempToken={changePasswordtempToken}
            setTempToken={setChangePasswordtempToken}
            email={changePasswordEmail}
            setEmail={setChangePasswordEmail}
          />
        );
      case 'changePassword':
        return <ChangePasswordView setView={setView} tempToken={changePasswordtempToken} email={changePasswordEmail} />;
      case 'initPassword':
        return (
          <InitPasswordView
            setView={setView}
            email={signupEmail}
            setEmail={setsignUpEmail}
            password={signupPassword}
            setPassword={setsignUpPassword}
          />
        );
      case 'agreeTerms':
        return (
          <AgreeTermsView
            setView={setView}
            email={signupEmail}
            setEmail={setsignUpEmail}
            password={signupPassword}
            setPassword={setsignUpPassword}
            tempToken={tempToken}
          />
        );
      case 'onboarding':
        return <OnBoardingView setView={setView} />;
      case 'close':
        onClose();
        break;
      // case 'signupEmail':
      //   return <SignupEmailView setView={setView} />;
      // ... (다른 뷰 케이스들) ...
      default:
        return <LoginView setView={setView} />;
    }
  };

  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-overlay bg-opacity-40 z-110">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex  justify-center items-center max-w-[656px] max-h-[850px]  py-[48px]  flex-col px-[56px] rounded-[16px]  bg-white shadow-gradient 
      origin-center"
        style={{ transform: `scale(${scale})` }}>
        <button className="flex absolute top-[48px] right-[56px] gap-[4px] py-[3px] h-[22px]" onClick={onClose}>
          <img src={exitIcon} alt="나가기" className="h-[20px] w-[16px] text-gray-700" />
          <p className="custom-body2 text-gray-700">나가기</p>
        </button>
        <img src={PromptPlaceLogo} alt="PromptPlace 로고" className="mb-[40px] mt-[40px]" />

        {renderView()}

        <footer>
          <p className="custom-h3 text-gray-700">
            로그인 또는 회원가입 시 서비스의{' '}
            <Link to="/terms" className="underline decoration-1">
              이용약관
            </Link>
            과{' '}
            <Link to="/privacy" className="underline decoration-1">
              개인정보 처리 방침
            </Link>
            에 동의한 것으로 간주됩니다.
          </p>
        </footer>
      </div>
    </div>
  );
};
export default SocialLoginModal;
