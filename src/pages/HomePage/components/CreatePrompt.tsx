import arrow from '@/assets/icon-prompt-upload.svg';
import textIcon from '@/assets/icon-result-text.svg';
import imageIcon from '@/assets/icon-result-image.svg';
import imageResult from '@/assets/icon-prompt-result-instance.svg';

import { useNavigate } from 'react-router-dom';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import type { ReactNode } from 'react';

interface ResultCardProps {
  icon: string;
  title: string;
  description: string;
  handleShowLoginModal: (callback: () => void) => void;
  children: ReactNode;
}

const ResultCard = ({ icon, title, description, handleShowLoginModal, children }: ResultCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleShowLoginModal(() => navigate('/create'));
  };

  return (
    <div className="flex flex-1 min-w-0 justify-between gap-[40px] px-[20px] py-[24px] rounded-[12px] max-phone:flex-col max-phone:gap-[16px] shadow-card">
      <div className="flex flex-col gap-[24px] max-phone:contents">
        <div className="flex flex-col gap-[10px] max-phone:order-1">
          <div className="flex items-center gap-[10px]">
            <img src={icon} alt="" aria-hidden="true" className="w-[28px] h-[28px]" />
            <p className="custom-h4 max-phone:text-[16px]">{title}</p>
          </div>
          <p className="custom-body2 max-phone:text-[14px]">{description}</p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="flex items-center justify-center gap-[12px] border-[1px] border-gray-200 rounded-full bg-white custom-button1 text-text-on-white w-[116px] h-[45px] max-phone:order-3">
          <p>바로가기</p>
          <img src={arrow} alt="Arrow Icon" className="w-[12px] h-[18px]" />
        </button>
      </div>

      <div className="max-phone:order-2 w-full">{children}</div>
    </div>
  );
};

const CreatePrompt = () => {
  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  return (
    <div className="w-full px-[102px] max-lg:px-[40px] max-phone:px-[20px] pt-[64px] max-phone:pt-[48px] bg-white">
      <div className="flex gap-[40px] max-lg:gap-[32px] max-phone:gap-[24px] py-[40px] max-lg:py-0 flex-col">
        <section className="flex flex-col gap-[20px] shrink-0">
          <div className="flex flex-col gap-[8px]">
            <p className="custom-h1 max-phone:text-[24px]">프롬프트 올리기</p>
            <p className="custom-label1 text-text-on-white max-phone:text-[14px]">
              나만의 AI 프롬프트를 업로드하고 판매하세요!
            </p>
          </div>
        </section>

        <section className="flex gap-[20px] w-full max-lg:flex-col">
          <ResultCard
            icon={textIcon}
            title="텍스트 결과"
            description="프롬프트를 입력하면 텍스트 결과가 나와요"
            handleShowLoginModal={handleShowLoginModal}>
            <div className="px-5 py-4 rounded-xl bg-secondary w-full min-h-[162px]">
              <p className="custom-body2 text-text-tertiary max-phone:text-[12px]">
                ##시선을 끄는 광고 카피 제작##
                <br />
                "매일 아침 카페 대신 지구를 사세요"
                <br />
                "텀블러 하나로 커피값도, 환경도 절약하기"
                <br />
                “출근길, 내 텀블러 없인 이제 못 가요!”
              </p>
            </div>
          </ResultCard>

          <ResultCard
            icon={imageIcon}
            title="이미지 결과"
            description="프롬프트를 입력하면 이미지 결과가 나와요"
            handleShowLoginModal={handleShowLoginModal}>
            <div className="w-full h-[162px]">
              <img
                src={imageResult}
                alt="Image Result Example"
                className="rounded-[8px] w-full object-cover max-phone:w-full h-full"
              />
            </div>
          </ResultCard>
        </section>

        <div className="w-full h-0.5 bg-border-default"></div>
      </div>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </div>
  );
};

export default CreatePrompt;
