import GoogleIcon from '@/assets/icon-google-logo.svg';
import KakaoIcon from '@/assets/icon-kakao-logo.svg';
import NaverIcon from '@/assets/icon-naver-logo.svg';
import PrimaryButton from '@/components/Button/PrimaryButton';
import arrow from '@assets/icon-rightArrow.svg';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import { useState } from 'react';


interface InfoRowProps {
    label: string;
    nickname?: string;
    email?: string;
    provider?: 'google' | 'kakao' | 'naver';
    hasArrow?: boolean;
    actionText?: string;
    onAction?: () => void;
    isDestructive?: boolean;
  }
  
  const InfoRow: React.FC<InfoRowProps> = ({ label, nickname, email, provider, hasArrow, actionText, onAction, isDestructive }) => {
    
    const ICONS = {
      google: GoogleIcon,
      kakao: KakaoIcon,
      naver: NaverIcon,
    };
    const IconComponent = provider ? ICONS[provider] : null;

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <div className="flex items-center py-5 border-b-[1px] border-white-stroke bg-white h-[90px]">
        <span className="text-[24px] w-[704px] pl-[40px] text-text-on-white font-bold">{label}</span>
        
        {/* 값, 이메일, 버튼 중 하나를 조건부로 렌더링 */}
        {nickname && <span className="text-text-on-white font-medium text-[20px] pl-[10px]">{nickname}</span>}
        
        {email && (
          <div className="flex items-center gap-[10px] pl-[10px] text-text-on-white font-medium text-[20px]">
            {IconComponent && <img src={IconComponent} alt={provider} className="w-[32px] h-[32px]" />}
            <span>{email}</span>
            {hasArrow &&
             <button className="w-[24px] h-[24px]" onClick={() => setIsModalOpen(true)}>
             <img src={arrow} alt="arrow right" />
             </button>}
             {isModalOpen && (
              <SocialLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onClick={() => {}} />
            )}
          </div>
        )}


  
        {actionText && (
          <div className="pl-[10px] w-[300px]">
            <PrimaryButton
              buttonType="square"
              text={actionText}
              onClick={onAction || (() => {})}
              type="button">
            </PrimaryButton>
          </div>
        )}
      </div>

    );
  };

  export default InfoRow;