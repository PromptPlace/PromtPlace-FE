import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prompt } from '@/types/prompt.ts';
import Rating from '@/components/Rating';
import ModelButton from '@/components/Button/ModelButton';
import TagButton from '@/components/Button/TagButton';

import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import likeIcon from '@/assets/icon-heart-blue-big.svg';
import unLikeIcon from '@/assets/icon-heart-none-big.svg';

type Props = {
  prompt: Prompt;
};

const MobilePrompt = ({ prompt }: Props) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const { prompt_id, model, tags, title, price, rating_avg, views, downloadCount, description, is_free } = prompt;

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    // TODO: 서버 연동
  };

  return (
    <div className="w-full max-w-72 p-3 bg-white rounded-2xl flex flex-col gap-2 mb-[6px]">
      {/* 상단 모델 및 태그 영역 */}
      <div className="flex items-center gap-2.5">
        <ModelButton text={model}/>
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag, i) => (
            <TagButton hasDelete={false} key={i} text={`#${tag}`} onClick={() => {}}/>
          ))}
        </div>
      </div>

      {/* 타이틀 및 가격 */}
      <div className="flex justify-between items-start">
        <p
          className="text-xs font-medium text-text-on-white max-w-[210px] cursor-pointer"
          onClick={() => navigate(`/prompt/${prompt_id}`)}>
          {title}
        </p>
        <p className="text-[10px] text-text-on-white">{is_free ? '무료' : `${price.toLocaleString()}원`}</p>
      </div>

      {/* 별점 및 뷰/다운로드 수 */}
      <div className="flex items-center gap-2">
        <div className="flex items-center h-3">
          <Rating star={rating_avg} size="xs" />
          <span className="text-[8px] text-text-on-background ml-1">({rating_avg.toFixed(1)})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[8px] text-text-on-background">
            <img src={iconEye} className="w-3 h-3" />
            {views}
          </div>
          <div className="flex items-center gap-1 text-[8px] text-text-on-background">
            <img src={iconDownload} className="w-3 h-3" />
            {downloadCount}
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="max-h-24 overflow-hidden text-[8px] text-text-on-white whitespace-pre-line">{description}</div>

      {/* 찜 버튼 */}
      <button onClick={handleLike} className="absolute right-3 bottom-3">
        <img src={isLiked ? likeIcon : unLikeIcon} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MobilePrompt;
