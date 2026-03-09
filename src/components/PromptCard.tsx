import React, { useRef, useState, useLayoutEffect } from 'react';
import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import Rating from './Rating';
import Likes from '@/pages/MainPage/components/likes';
import { useNavigate } from 'react-router-dom';
import type { Prompt } from '@/types/MainPage/prompt';
import Stars from './Stars';

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  const navigate = useNavigate();

  const SINGLE_LINE_HEIGHT_THRESHOLD_PX = 30;
  const chipContainerRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useLayoutEffect(() => {
    if (chipContainerRef.current && !prompt.images?.length) {
      const height = chipContainerRef.current.scrollHeight;
      setIsWrapped(height > SINGLE_LINE_HEIGHT_THRESHOLD_PX);
    } else {
      // 이미지 카드일 때는 wrapped 상태 해제
      setIsWrapped(false);
    }
  }, [prompt.models, prompt.images]);

  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="w-[294px] h-[533px] rounded-lg" onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
      <div className="relative w-full h-[263px] bg-secondary rounded-t-lg overflow-hidden">
        {prompt.images?.[0]?.image_url ? (
          <img
            src={prompt.images[0].image_url}
            alt="프롬프트 이미지"
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <p
            className={`
        absolute left-6 right-6 top-6 text-sm text-gray-600 tracking-tight text-left font-[custom-body2]
        ${isWrapped ? 'line-clamp-8' : 'line-clamp-9'}
      `}>
            {prompt.prompt_result}
          </p>
        )}

        {/* 모델 칩 컨테이너 */}
        <div ref={chipContainerRef} className="absolute left-[16px] bottom-4 flex flex-wrap gap-2 z-10">
          {prompt.models.map((model, index) => (
            <div key={index} className="px-2 py-0.5 bg-overlay rounded inline-flex justify-center items-center gap-2.5">
              <span className="text-white text-[10px] font-medium leading-4 line-clamp-1 font-[custom-button3]">
                {model?.model?.name}
              </span>
            </div>
          ))}
        </div>

        {/* 좋아요 버튼 */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center cursor-pointer pointer-events: none">
          <Likes prompt_id={prompt.prompt_id} />
        </div>
      </div>

      <div className="w-full h-[270px] px-6 py-5 inline-flex flex-col justify-start gap-3 bg-white rounded-b-lg cursor-pointer">
        <div className="text-xs font-light leading-4 inline-flex justify-between items-start self-stretch">
          <div>{prompt?.user?.nickname}</div>
          <div className="text-gray-400 ">{new Date(prompt.created_at).toLocaleDateString('ko-KR')}</div>
        </div>

        <div className="font-medium font-[custom-h3] has-[44px]:">{prompt.title}</div>

        <div className="flex items-center justify-start gap-[12px] text-gray-400 font-[12px] font-[custom-button2] leading-4">
          <div className="flex items-center justify-start gap-[6px]">
            <img src={iconEye} alt="views" className="w-4 h-4" /> {prompt.views}
          </div>

          <div className="flex items-center justify-start gap-[6px] font-[custom-button-2]">
            <img src={iconDownload} alt="downloads" className="w-4 h-4" /> {prompt.downloads}
          </div>
        </div>

        <div className="text-lg leading-6">{prompt.is_free ? '무료' : `${prompt.price.toLocaleString()}원`}</div>
        <div className="text-xs font-light w-[246px] h-[51px]">{prompt.description}</div>
        <div className="w-[246px] h-[41px] gap-[8px]">
          {prompt.review_count === 0 ? (
            <div></div>
          ) : (
            <div>
              <div className="justify-start flex">
                <Stars star={prompt.review_rating_avg} />
              </div>
              <div className="text-xs font-light text-gray-400 w-full h-[17px] truncate"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
