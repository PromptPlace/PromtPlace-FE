import CloseIcon from '@assets/icon-close.svg';
import KakaoIcon from '@assets/icon-kakao-logo.svg';
import GoogleIcon from '@assets/icon-google-logo.svg';
import NaverIcon from '@assets/icon-naver-logo.svg';
import PromptPlaceLogo from '@assets/logo/text/text-logo-login.svg';
import PrimaryButton from '@components/Button/PrimaryButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import eye_visible from '@assets/icon-eye-visible.svg';
import eye_invisible from '@assets/icon-eye-invisible.svg';
import exitIcon from '@assets/icon-exit.svg';
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
}

const SocialButton = ({ icon, onClick }: { icon: string; text: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-[56px] h-[56px]  border-[0.5px] border-text-on-white rounded-[50px] px-[16px] py-[16px] flex items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]
    hover:bg-secondary hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.12)] 
    active:bg-secondary-pressed">
    <img src={icon} alt="소셜 로고" className="w-[24px] max-lg:w-[20px] h-[24px] max-lg:h-[20px]" />
  </button>
);

const CALLBACK_URL = new URL('auth/callback', window.location.origin).toString();

const handleGoogleLogin = () => {
  // 1. 필요한 정보들을 정의합니다.
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // 2. 모든 파라미터를 조합하여 Google 인증 URL을 생성합니다.
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${CALLBACK_URL}&response_type=code&scope=openid%20profile%20email`;
  sessionStorage.setItem('login_provider', 'google');
  // 3. 생성된 URL로 페이지 전체를 이동시킵니다. (핵심)
  window.location.href = googleAuthUrl;
};

const handleNaverLogin = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  sessionStorage.setItem('login_provider', 'naver');
  const STATE = crypto.randomUUID(); // CSRF 방지를 위한 임의 문자열
  sessionStorage.setItem('naver_state', STATE);

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    CALLBACK_URL,
  )}&state=${STATE}`;
  window.location.href = naverAuthUrl;
};

export const handleKakaoLogin = () => {
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  console.log('CLIENT_ID', KAKAO_CLIENT_ID);
  const state = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  sessionStorage.setItem('oauth_state', state);
  sessionStorage.setItem('login_provider', 'kakao');

  // 카카오는 scope를 공백으로 구분 (요구 권한에 맞춰 수정 가능)
  const params = new URLSearchParams({
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: CALLBACK_URL,
    response_type: 'code',
    state,
    scope: 'profile_nickname account_email',
  });

  window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

const SocialLoginModal = ({ isOpen, onClose }: SocialLoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // 로그인 실패 시 여기에 메시지 설정

  const isDisabled = email === '' || password === '';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 이메일/비밀번호 로그인 로직 추가
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-overlay bg-opacity-40 z-110  max-lg:p-[0px]">
      <div className="relative flex  justify-center items-center w-[656px] max-lg:w-full h-[903px] max-lg:h-full flex-col px-[56px] py-[48] rounded-[16px] max-lg:rounded-none max-lg:px-[20px] bg-white shadow-gradient ">
        <button
          className="flex max-lg:hidden absolute top-[48px] right-[56px] gap-[4px] py-[3px] h-[22px]"
          onClick={onClose}>
          <img src={exitIcon} alt="나가기" className="h-[16px] w-[16px] " />
          <p className="custom-body2 text-gray-700">나가기</p>
        </button>
        <img src={PromptPlaceLogo} alt="PromptPlace 로고" className="mb-[40px]" />

        <div className="w-full">
          <p className=" custom-h2 mb-[8px]">로그인하기</p>
          <p className=" custom-h3 mb-[24px]">로그인하고 더 많은 혜택을 누려보세요!</p>
        </div>

        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="custom-h5 mb-[12px]">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="예) abc1234@gmail.com"
              className="bg-background px-[16px] py-[12px] placeholder:text-gray-400 text-text-on-white custom-body2 mb-[20px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-[40px]">
            <label className="custom-h5 mb-[12px]" htmlFor="password">
              비밀번호
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="예) **********"
                className="w-full bg-background px-[16px] py-[12px] custom-body2 placeholder:text-gray-400 text-text-on-white mb-[12px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* (비밀번호 보기 아이콘 버튼) */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-[15px] pr-3 flex items-center">
                <img
                  src={showPassword ? eye_visible : eye_invisible}
                  alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  className="w-[24px] h-[24px] flex items-center justify-center"
                />
              </button>
            </div>

            {error && <p className="text-alert custom-h5 mt-[4px]">{error}</p>}
          </div>
          <PrimaryButton
            buttonType="full"
            type="submit"
            text="로그인하기"
            textColor="white"
            disable={isDisabled}
            onClick={() => {}}
          />
        </form>

        <nav aria-label="계정 보조 메뉴" className="flex mt-[28px] gap-[32px] custom-h5 mb-[40px]">
          <Link to="/signup">회원가입하기</Link>
          <Link to="/find-password">비밀번호 찾기</Link>
        </nav>

        <section className="flex flex-col items-center w-full gap-[16px] mx-[114px] mb-[40px]">
          <div className="flex items-center w-[464px]">
            {/* 1. 왼쪽 선 */}
            <div className="flex-1 border-t border-gray-200"></div>
            <p className="custom-body3">간편 로그인 하기</p>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          <div className="flex gap-[32px]">
            <SocialButton icon={GoogleIcon} text="구글로 로그인" onClick={handleGoogleLogin} />
            <SocialButton icon={NaverIcon} text="네이버로 로그인" onClick={handleNaverLogin} />
          </div>
        </section>

        <footer>
          <p className="custom-h3">
            로그인 또는 회원가입 시 서비스의
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
