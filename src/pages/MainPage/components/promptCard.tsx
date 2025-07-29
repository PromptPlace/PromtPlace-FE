/**
 * Todo(07/18):
 * 1. 프롬프트 카드 찜 기능 구현 -> 서버 연동 필요
 */

import React, { useState } from 'react';
import type { Prompt } from '@/types/prompt.ts';
import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import Rating from '@/components/Rating';
import profileImage from '@/assets/icon-profile-gray.svg';
import likeIcon from '@/assets/icon-heart-blue-big.svg';
import unLikeIcon from '@/assets/icon-heart-none-big.svg';
import TagButton from '@/components/Button/TagButton';
import ModelButton from '@/components/Button/ModelButton';
import { useNavigate } from 'react-router-dom';

type props = {
  prompt: Prompt;
};

const PromptCard = ({ prompt }: props) => {
  const navigate = useNavigate();
  const {
    author_id,
    authorname,
    prompt_id,
    authorimage,
    title,
    description,
    is_free,
    model,
    price,
    downloadCount,
    views,
    rating_avg,
    tags,
  } = prompt;
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    // 찜 기능 서버 연동
  };

  return (
    <div className="flex flex-col w-full max-w-[832px] mt-[42px]">
      {/* 작성자 정보 (카드 바깥쪽) */}
      <div
        className="inline-flex justify-start items-center gap-3.5 cursor-pointer"
        onClick={() => navigate(`/profile/${author_id}`)}>
        <img
          src={authorimage ? authorimage : profileImage}
          alt="authorImage"
          className="w-14 h-14 rounded-[100px] inline-flex flex-col justify-center items-center"
        />
        <span className="text-[18px] font-medium">{authorname}</span>
      </div>

      {/* 카드 본문 */}
      <div className="relative w-full h-full max-w-[780px] max-h-[320px] bg-white rounded-xl shadow-md p-4 overflow-hidden overflow-ellipsis ml-auto">
        <div className="flex flex-wrap items-center px-2.5 py-0.5 gap-2.5 mb-[14px]">
          <ModelButton text={model} />
          {tags.map((tag, index) => (
            <span key={index}>
              <TagButton hasDelete={false} text={`#${tag}`} onClick={() => {}} />
            </span>
          ))}
        </div>

        <div
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => navigate(`/prompt/${prompt_id}`)}>
          <span className="text-xl">{title}</span>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 text-lg">{is_free ? '무료' : `${price}원`}</div>
            <div>
              <Rating star={rating_avg} />
            </div>
            <div className="flex items-center gap-1">
              <img src={iconEye} className="w-4 h-4" /> {views}
            </div>
            <div className="flex items-center gap-1">
              <img src={iconDownload} className="w-4 h-4" /> {downloadCount}
            </div>
          </div>
        </div>

        <p
          className="text-sm text-gray-800 whitespace-pre-line cursor-pointer"
          onClick={() => navigate(`/prompt/${prompt_id}`)}>
          {description}
        </p>

        <button onClick={handleLike} className="absolute right-4 bottom-4 z-10">
          <img src={isLiked ? likeIcon : unLikeIcon} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
