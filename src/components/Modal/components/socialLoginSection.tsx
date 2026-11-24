import GoogleIcon from '@assets/icon-google-logo.svg';
import NaverIcon from '@assets/icon-naver-logo.svg';

//소셜 로그인 버튼 컴포넌트
const SocialButton = ({ icon, text, onClick }: { icon: string; text: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-[56px] h-[56px] max-phone:w-[40px] max-phone:h-[40px] border-[0.5px] border-text-on-white rounded-[50px] px-[16px] py-[16px] max-phone:px-[12px] max-phone:py-[12px] flex items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]
    hover:bg-secondary hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]
    active:bg-secondary-pressed">
    <img src={icon} alt={text} className="w-[24px] max-lg:w-[20px] h-[24px] max-lg:h-[20px]" />
  </button>
);

//소셜 로그인 (신규 사용자는 소셜 로그인 시 자동 가입 처리)
const CALLBACK_URL = new URL('auth/callback', window.location.origin).toString();

const handleGoogleLogin = () => {
  sessionStorage.setItem('prevPath', window.location.pathname + window.location.search);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const STATE = crypto.randomUUID(); // CSRF 방지를 위한 임의 문자열 (콜백에서 google_state와 대조)
  sessionStorage.setItem('login_provider', 'google');
  sessionStorage.setItem('google_state', STATE);
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    CALLBACK_URL,
  )}&response_type=code&scope=${encodeURIComponent('openid profile email')}&state=${STATE}`;
  window.location.href = googleAuthUrl;
};

const handleNaverLogin = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  sessionStorage.setItem('prevPath', window.location.pathname + window.location.search);
  sessionStorage.setItem('login_provider', 'naver');
  const STATE = crypto.randomUUID(); // CSRF 방지를 위한 임의 문자열
  sessionStorage.setItem('naver_state', STATE);

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    CALLBACK_URL,
  )}&state=${STATE}`;
  window.location.href = naverAuthUrl;
};

interface SocialLoginSectionProps {
  label: string; // 구분선 가운데 문구 (예: '간편 로그인 하기')
}

//구분선 + 소셜 버튼 묶음 (로그인/회원가입 모달 공용)
const SocialLoginSection = ({ label }: SocialLoginSectionProps) => (
  <section className="flex flex-col items-center w-full gap-[16px] mx-[114px] mb-[40px] max-phone:mb-[32px]">
    <div className="flex items-center w-[464px]">
      <div className="flex-1 border-t border-gray-200"></div>
      <p className="custom-body3 text-gray-400">{label}</p>
      <div className="flex-1 border-t border-gray-200"></div>
    </div>
    <div className="flex gap-[32px]">
      <SocialButton icon={GoogleIcon} text="구글로 로그인" onClick={handleGoogleLogin} />
      <SocialButton icon={NaverIcon} text="네이버로 로그인" onClick={handleNaverLogin} />
    </div>
  </section>
);

export default SocialLoginSection;
