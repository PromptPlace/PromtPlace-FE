import GoogleIcon from '@/assets/icon-google-logo.svg';
import KakaoIcon from '@/assets/icon-kakao-logo.svg';
import NaverIcon from '@/assets/icon-naver-logo.svg';
import PrimaryButton from '@/components/Button/PrimaryButton';
import arrow from '@assets/icon-arrow-right-black.svg';
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

const InfoRow: React.FC<InfoRowProps> = ({ label, nickname, email, provider, hasArrow, actionText, onAction }) => {
  const ICONS = {
    google: GoogleIcon,
    kakao: KakaoIcon,
    naver: NaverIcon,
  };
  const IconComponent = provider ? ICONS[provider] : null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex max-lg:justify-between items-center py-5 max-lg:py-[12px] max-lg:px-[12px] border-b-[1px] max-lg:border-b-[0.5px] border-white-stroke bg-white h-[90px] max-lg:h-[51px]">
      <span className="text-[24px] max-lg:text-[12px] w-[704px] max-lg:w-auto pl-[40px] max-lg:pl-[0px] text-text-on-white font-bold max-lg:font-medium">
        {label}
      </span>

      {/* 값, 이메일, 버튼 중 하나를 조건부로 렌더링 */}
      {nickname && (
        <span className="text-text-on-white font-medium max-lg:font-normal text-[20px] max-lg:text-[10px] pl-[10px]">
          {nickname}
        </span>
      )}

      {email && (
        <div className="flex items-center gap-[10px] max-lg:gap-[3.5px] pl-[10px] max-lg:pl-[0px] text-text-on-white font-medium max-lg:font-normal text-[20px] max-lg:text-[10px]">
          {IconComponent && (
            <img src={IconComponent} alt={provider} className="w-[32px] max-lg:w-[20px] h-[32px] max-lg:h-[20px]" />
          )}
          <span>{email}</span>
          {hasArrow && (
            <button
              className="flex max-lg:justify-center  items-center w-[24px] max-lg:w-[16px] h-[24px] max-lg:h-[16px]"
              onClick={() => setIsModalOpen(true)}>
              <img src={arrow} alt="arrow right" className="max-lg:w-[4.3px] max-lg:h-[7.4px]" />
            </button>
          )}
          {isModalOpen && <SocialLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
      )}

      {actionText && (
        <div className="pl-[10px] w-[300px] max-lg:w-[77px]">
          <PrimaryButton
            buttonType="square"
            text={actionText}
            onClick={onAction || (() => {})}
            type="button"></PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default InfoRow;
