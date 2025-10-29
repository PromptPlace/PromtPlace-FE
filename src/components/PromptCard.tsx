import React, { useRef, useState, useLayoutEffect } from 'react';
import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import Rating from './Rating';
import Likes from '@/pages/MainPage/components/likes';
import { useNavigate } from 'react-router-dom';

// props / types
interface PromptData {
  promptId: number;
  promptImage: string | null;
  promptDescription: string;
  promptModels: string[];
  promptWriter: string;
  promptCreatedAt: string;
  promptTitle: string;
  promptViews: number;
  promptDownloads: number;
  promptPrice: number;
  promptContent: string;
  promptRating: number;
  promptReview: string;
}

interface PromptCardProps {
  prompt: PromptData;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  const navigate = useNavigate();

  const SINGLE_LINE_HEIGHT_THRESHOLD_PX = 30;
  const chipContainerRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useLayoutEffect(() => {
    if (chipContainerRef.current && !prompt.promptImage) {
      const height = chipContainerRef.current.scrollHeight;
      setIsWrapped(height > SINGLE_LINE_HEIGHT_THRESHOLD_PX);
    } else {
      // 이미지 카드일 때는 wrapped 상태 해제
      setIsWrapped(false);
    }
  }, [prompt.promptModels, prompt.promptImage]);

  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="w-[294px] h-[533px] rounded-lg">
      <div className="relative w-full h-[263px] bg-secondary rounded-t-lg overflow-hidden">
        {prompt.promptImage ? (
          <img src={prompt.promptImage} alt="프롬프트 이미지" className="w-full h-full object-cover rounded-t-lg" />
        ) : (
          <p
            className={`
        absolute left-6 right-6 top-6 text-sm text-gray-600 tracking-tight text-center
        ${isWrapped ? 'line-clamp-8' : 'line-clamp-9'}
      `}>
            {prompt.promptDescription}
          </p>
        )}

        {/* 모델 칩 컨테이너 */}
        <div ref={chipContainerRef} className="absolute left-[16px] bottom-4 flex flex-wrap gap-2 z-10">
          {prompt.promptModels.map((model, index) => (
            <div
              key={index}
              className="px-2 py-0.5 bg-overlay/40 rounded inline-flex justify-center items-center gap-2.5">
              <span className="text-white text-[10px] font-medium leading-4 line-clamp-1">{model}</span>
            </div>
          ))}
        </div>

        {/* 좋아요 버튼 */}
        <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center cursor-pointer">
          <Likes prompt_id={prompt.promptId} />
        </div>
      </div>

      <div
        className="w-full h-[270px] px-6 py-5 inline-flex flex-col justify-start gap-3 bg-white rounded-b-lg cursor-pointer"
        onClick={() => navigate(`/prompt/${prompt.promptId}`)}>
        <div className="text-xs font-light leading-4 inline-flex justify-between items-start self-stretch">
          <div>{prompt.promptWriter}</div>
          <div>{prompt.promptCreatedAt}</div>
        </div>

        <div className="font-medium">{prompt.promptTitle}</div>

        <div className="flex items-center justify-start gap-[12px] text-gray-400 font-xs leading-4">
          <div className="flex items-center justify-start gap-[6px]">
            <img src={iconEye} alt="views" className="w-4 h-4" /> {prompt.promptViews}
          </div>

          <div className="flex items-center justify-start gap-[6px]">
            <img src={iconDownload} alt="downloads" className="w-4 h-4" /> {prompt.promptDownloads}
          </div>
        </div>

        <div className="text-lg leading-6">{prompt.promptPrice == 0 ? '무료' : `${prompt.promptPrice}원`}</div>
        <div className="text-xs font-light h-[51px] truncate">{prompt.promptContent}</div>
        <div className="self-start">
          <Rating star={prompt.promptRating} />
        </div>
        <div className="text-xs font-light text-gray-400 w-full truncate">{prompt.promptReview}</div>
      </div>
    </div>
  );
};

export default PromptCard;
