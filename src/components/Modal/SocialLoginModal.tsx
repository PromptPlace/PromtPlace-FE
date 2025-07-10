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


const SocialButton = ({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full h-[64px] border-[1px] border-text-on-white rounded-[50px] py-3 flex items-center justify-center gap-[3.5px] hover:bg-gray-50"
  >
    <img src={icon} alt="" className="w-[32px] h-[32px]" />
    <span className="w-[216px] h-[25px] text-text-on-white text-[20px] font-medium">{text}</span>
  </button>
);



const SocialLoginModal = ({ isOpen, onClose, onClick }: SocialLoginModalProps) => {
    if (!isOpen) return null;
  
    return (
 
      <div className="fixed inset-0 flex items-center justify-center bg-overlay bg-opacity-40 z-50 p-4">
   
        <div className="relative flex w-[563px] h-[757px]   flex-col items-center rounded-[16px] bg-white shadow-gradient ">
          
          <button className="absolute top-[34px] right-[34px]" onClick={onClose}>
            <img src={CloseIcon} alt="닫기" className="h-[24px] w-[24px]" />
          </button>
    
          <div className="mb-[59px] mt-[105px] flex flex-col items-center gap-[15px]">
            <img src={PromptPlaceLogo} alt="PromptPlace 로고" className="w-[72px] h-[72px]" />
            
            <img src={HeaderLogo} alt="PromptPlace 헤더 로고" className="h-[35px] w-[350px]" />
          </div>
    
         
          <div className="flex flex-col w-[334px]  gap-[28px] mb-[223px] mx-[114px]">
            <SocialButton icon={KakaoIcon} text="카카오톡으로 로그인" onClick={() => onClick('kakao')} />
            <SocialButton icon={GoogleIcon} text="구글로 로그인" onClick={() => onClick('google')} />
            <SocialButton icon={NaverIcon} text="네이버로 로그인" onClick={() => onClick('naver')} />
          </div>

        </div>
      </div>
    );
  }
  export default SocialLoginModal;
  
 
  



