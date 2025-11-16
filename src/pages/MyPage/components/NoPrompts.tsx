import NoPromptIcon from '@/assets/my/icon-no-prompts-default.svg';
import NoLikedIcon from '@/assets/my/icon-no-liked-prompts.svg';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export const NoAuthoredPrompts = () => {
  const navigate = useNavigate();

  const handleCreatePrompt = () => {
    navigate('/prompt/create');
  };
  return (
    <div className="w-[272px] h-[300px] flex flex-col justify-center items-center gap-[12px]">
      <img src={NoPromptIcon} alt="작성한 프롬프트 없음 아이콘" />
      <p className="custom-h4 text-gray-600">작성한 프롬프트가 없어요</p>
      <p className="custom-h5 text-gray-500">프롬프트를 작성해보세요!</p>
      <PrimaryButton
        buttonType="square"
        text="작성하러 가기"
        textColor="white"
        py={16}
        px={20}
        onClick={handleCreatePrompt}
      />
    </div>
  );
};

export const NoDownloadedPrompts = () => {
  const navigate = useNavigate();

  const handleExplorePrompts = () => {
    navigate('/prompt');
  };
  return (
    <div className="w-[272px] h-[300px] flex flex-col justify-center items-center gap-[12px]">
      <img src={NoPromptIcon} alt="다운받은 프롬프트 없음 아이콘" />
      <p className="custom-h4 text-gray-600">다운받은 프롬프트가 없어요</p>
      <p className="custom-h5 text-gray-500">다양한 프롬프트를 둘러보세요!</p>
      <PrimaryButton
        buttonType="square"
        text="둘러보러 가기"
        textColor="white"
        py={16}
        px={20}
        onClick={handleExplorePrompts}
      />
    </div>
  );
};
export const NoLikedPrompts = () => {
  const navigate = useNavigate();

  const handleExplorePrompts = () => {
    navigate('/prompt');
  };
  return (
    <div className="w-[272px] h-[300px] flex flex-col justify-center items-center gap-[12px]">
      <img src={NoLikedIcon} alt="찜한 프롬프트 없음 아이콘" />
      <p className="custom-h4 text-gray-600">찜한 프롬프트가 없어요</p>
      <p className="custom-h5 text-gray-500">다양한 프롬프트를 둘러보세요!</p>
      <PrimaryButton
        buttonType="square"
        text="둘러보러 가기"
        textColor="white"
        py={16}
        px={20}
        onClick={handleExplorePrompts}
      />
    </div>
  );
};
