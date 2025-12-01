import NoPromptIcon from '@/assets/my/icon-no-prompts-default.svg';
import NoLikedIcon from '@/assets/my/icon-no-liked-prompts.svg';
import { useNavigate } from 'react-router-dom';

export const NoAuthoredPrompts = () => {
  const navigate = useNavigate();

  const handleCreatePrompt = () => {
    navigate('/create');
  };
  return (
    <div className="w-[272px] h-[300px] flex flex-col justify-center items-center gap-[12px]">
      <img src={NoPromptIcon} alt="작성한 프롬프트 없음 아이콘" />
      <p className="custom-h4 text-gray-600">작성한 프롬프트가 없어요</p>
      <p className="custom-h5 text-gray-500">프롬프트를 작성해보세요!</p>

      <button
        onClick={handleCreatePrompt}
        className="custom-h4 text-white bg-primary rounded-[12px] py-[16px] px-[20px]">
        작성하러 가기
      </button>
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
      <button
        onClick={handleExplorePrompts}
        className="custom-h4 text-white bg-primary rounded-[12px] py-[16px] px-[20px]">
        둘러보러 가기
      </button>
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
      <button
        onClick={handleExplorePrompts}
        className="custom-h4 text-white bg-primary rounded-[12px] py-[16px] px-[20px]">
        둘러보러 가기
      </button>
    </div>
  );
};
