/**
 * Todo(07/18):
 * 1. 프롬프트 카드 찜 기능 구현 -> 서버 연동 필요
 */

import React, { useState } from 'react';
import type { Prompt } from '@/types/MainPage/prompt';
import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import Rating from '@/components/Rating';
import profileImage from '@/assets/icon-profile-gray.svg';
import TagButton from '@/components/Button/TagButton';
import ModelButton from '@/components/Button/ModelButton';
import { useNavigate } from 'react-router-dom';
import Likes from './likes';

interface promptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: promptCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full max-w-[832px] mt-[42px]">
      {/* 작성자 정보 (카드 바깥쪽) */}
      <div
        className="inline-flex justify-start items-center gap-3.5 cursor-pointer"
        onClick={() => navigate(`/profile/${prompt.user_id}`)}>
        <img
          src={prompt.user.profile_img_url ? prompt.user.profile_img_url : profileImage}
          alt="authorImage"
          className="w-14 h-14 rounded-[100px] inline-flex flex-col justify-center items-center"
        />
        <span className="text-[18px] font-medium">{prompt.user.nickname}</span>
      </div>

      {/* 카드 본문 */}
      <div className="relative w-full max-w-[780px] max-h-[320px] bg-white rounded-2xl shadow-md px-5 py-6 overflow-hidden ml-auto">
        {/* 모델 + 태그 */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {prompt.models.map((modelObj, idx) => (
            <ModelButton key={modelObj.promptmodel_id || idx} text={modelObj.model.name} />
          ))}
          {prompt.tags.map((tag, index) => (
            <span key={tag.tag_id || index}>
              <TagButton hasDelete={false} text={`#${tag?.tag.name ?? ''}`} onClick={() => {}} />
            </span>
          ))}
        </div>

        {/* 제목 + 가격 + 통계 */}
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
          <span className="text-xl font-medium text-gray-900">{prompt.title}</span>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 text-lg">
              {prompt.is_free ? '무료' : `${prompt.price.toLocaleString()}원`}
            </div>
            <div>
              <Rating star={prompt.review_rating_avg} />
            </div>
            <div className="flex items-center gap-1">
              <img src={iconEye} className="w-[24px] h-[24px]" /> {prompt.views}
            </div>
            <div className="flex items-center gap-1">
              <img src={iconDownload} className="w-[24px] h-[24px]" /> {prompt.downloads}
            </div>
          </div>
        </div>

        {/* 설명 */}
        <p
          className="text-base text-gray-800 whitespace-pre-line cursor-pointer"
          onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
          {prompt.description}
        </p>

        {/* 찜 아이콘 */}
        <Likes key={prompt.prompt_id} {...prompt} />
      </div>
    </div>
  );
};

export default PromptCard;
