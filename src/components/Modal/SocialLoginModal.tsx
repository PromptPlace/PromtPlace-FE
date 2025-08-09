import CloseIcon from '@assets/icon-close.svg';
import KakaoIcon from '@assets/icon-kakao-logo.svg';
import GoogleIcon from '@assets/icon-google-logo.svg';
import NaverIcon from '@assets/icon-naver-logo.svg';
import PromptPlaceLogo from '@assets/icon-promptplace-logo.svg';
import HeaderLogo from '@assets/icon-header-logo.svg';

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

const SocialButton = ({ icon, text, onClick }: { icon: string; text: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-[334px] max-lg:w-[212px] h-[64px] max-lg:h-[48px] border-[1px] border-text-on-white rounded-[50px] px-[40px] max-lg:px-[16px] py-[16px] max-lg:py-[8px] flex items-center  gap-[15px] shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]
    hover:bg-secondary hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.12)] 
    active:bg-secondary-pressed">
    <img src={icon} alt="소셜 로고" className="w-[32px] max-lg:w-[20px] h-[32px] max-lg:h-[20px]" />
    <span className="w-[216px] max-lg:w-[145px] text-text-on-white text-[20px] max-lg:text-[12px] font-medium max-lg:font-bold ">
      {text}
    </span>
  </button>
);

const SocialLoginModal = ({ isOpen, onClose, onClick }: SocialLoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-overlay bg-opacity-40 z-110 p-4 max-lg:p-[0px]">
      <div className="relative flex justify-center items-center w-[563px] max-lg:w-full h-[757px] max-lg:h-full flex-col  rounded-[16px] max-lg:rounded-none max-lg:px-[20px] bg-white shadow-gradient ">
        <button className="max-lg:hidden absolute top-[34px] right-[34px]" onClick={onClose}>
          <img src={CloseIcon} alt="닫기" className="h-[24px] w-[24px]" />
        </button>
        <div>
          <div className=" mb-[48px] max-lg:mb-[20px] mt-[105px] max-lg:mt-[21px] flex flex-col lg:items-center gap-[15px]">
            <img
              src={PromptPlaceLogo}
              alt="PromptPlace 로고"
              className="w-[72px] max-lg:w-[48px] h-[72px] max-lg:h-[48px]"
            />

            <img src={HeaderLogo} alt="PromptPlace 헤더 로고" className="max-lg:hidden h-[35px] w-[350px]" />
          </div>

          <p className="lg:hidden text-[16px], text-text-on-white font-bold mb-[8px]">프롬프트 플레이스,</p>
          <p className="lg:hidden text-[14px], text-text-on-white font-medium mb-[48px]">
            로그인 후 더 많은 서비스를 이용하세요.
          </p>
        </div>

        <div className="flex flex-col items-center w-[334px]  gap-[32px] mb-[226px] max-lg:mb-[48px] mx-[114px] max-lg:mx-[0px]">
          <SocialButton icon={KakaoIcon} text="카카오톡으로 로그인" onClick={() => onClick('kakao')} />
          <SocialButton icon={GoogleIcon} text="구글로 로그인" onClick={() => onClick('google')} />
          <SocialButton icon={NaverIcon} text="네이버로 로그인" onClick={() => onClick('naver')} />
        </div>

        <button
          onClick={onClose}
          className="lg:hidden flex  underline text-[12px] text-primary text-normal w-[130px] h-[15px] ">
          가입 안하고 마저 탐색하기
        </button>
      </div>
    </div>
  );
};
export default SocialLoginModal;
