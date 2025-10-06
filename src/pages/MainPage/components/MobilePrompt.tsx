import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prompt } from '@/types/MainPage/prompt';
import Rating from '@/components/Rating';
import ModelButton from '@/components/Button/ModelButton';
import TagButton from '@/components/Button/TagButton';

import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import likeIcon from '@/assets/icon-heart-blue-big.svg';
import unLikeIcon from '@/assets/icon-heart-none-big.svg';
import MobilePrompter from './MobilePrompter';
import Likes from './likes';

type Props = {
  prompt: Prompt;
};

const MobilePrompt = ({ prompt }: Props) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-1.5 mb-[6px] px-4">
      {/* 프로필 */}
      <MobilePrompter key={prompt.user.user_id} prompter={prompt.user} />

      {/* 카드 본문 */}
      <div className="relative bg-white rounded-2xl p-3 flex flex-col gap-2">
        {/* 모델 + 태그 */}
        <div className="flex gap-[10px] overflow-x-auto">
          <div className="flex gap-[6px] flex-nowrap min-w-0">
            {prompt.models.map((modelObj, idx) => (
              <ModelButton key={modelObj.promptmodel_id || idx} text={modelObj.model.name} />
            ))}
          </div>
          <div className="flex gap-[6px] flex-nowrap min-w-0">
            {prompt.tags.slice(0, 4).map((tag, i) => (
              <TagButton hasDelete={false} key={i} text={`#${tag.tag.name}`} onClick={() => {}} />
            ))}
          </div>
        </div>

        <div className="cursor-pointer" onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
          {/* 제목 + 가격 */}
          <div className="flex justify-between items-start mt-[6px]">
            <p className="text-xs font-medium text-text-on-white w-100% cursor-pointer">{prompt.title}</p>
            <p className="text-[10px] text-text-on-white">
              {prompt.is_free ? '무료' : `${prompt.price.toLocaleString()}원`}
            </p>
          </div>

          {/* 별점, 조회수, 다운로드 수 */}
          <div className="flex items-center gap-2 mt-[6px]">
            <div className="flex items-center h-3">
              <Rating star={prompt.review_rating_avg} />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 text-[8px] text-text-on-background">
                <img src={iconEye} className="w-3 h-3" />
                {prompt.views}
              </div>
              <div className="flex items-center gap-1 text-[8px] text-text-on-background">
                <img src={iconDownload} className="w-[12px] h-[12px]" />
                {prompt.downloads}
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="max-h-24 max-w-[calc(100%-30px)] overflow-hidden text-[8px] text-text-on-white whitespace-pre-line mt-[6px]">
            <p>{prompt.prompt_result}</p>
            <div className="flex gap-2 overflow-x-auto mt-1">
              {prompt.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.image_url || ''}
                  alt={`Prompt Example Image ${index + 1}`}
                  className="object-cover h-[70px] flex-shrink-0"
                />
              ))}
            </div>
          </div>
          {/* 찜 버튼 */}
          <Likes key={prompt.prompt_id} {...prompt} />
        </div>
      </div>
    </div>
  );
};

export default MobilePrompt;
