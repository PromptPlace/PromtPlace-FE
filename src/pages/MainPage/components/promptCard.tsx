/**
 *Author: @곽도윤
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
import { useAuth } from '@/context/AuthContext';
import usePatchDeletePrompts from '@/hooks/mutations/ProfilePage/usePatchDeletePrompts';
import deleteButton from '@/assets/icon-delete.svg';
// import deleteButton from '@/assets/icon-delete.svg';
// import usePatchDeletePrompts from '@/hooks/mutations/ProfilePage/usePatchDeletePrompts';

interface promptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: promptCardProps) => {
  const navigate = useNavigate();
  const user = useAuth().user;

  const { mutate: mutateDeletePrompts } = usePatchDeletePrompts({ member_id: user?.user_id ?? 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [targetPromptId, setTargetPromptId] = useState<number | null>(null);

  const openConfirm = (promptId: number) => {
    setTargetPromptId(promptId);
    setIsOpen(true);
  };

  const closeConfirm = () => {
    setTargetPromptId(null);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!targetPromptId) return;
    mutateDeletePrompts({ prompt_id: targetPromptId });
    closeConfirm();
  };

  return (
    <div className="flex flex-col w-full max-w-[832px] mt-[42px]">
      {/* 작성자 정보 (카드 바깥쪽) */}
      <div
        className="inline-flex justify-start items-center gap-3.5 cursor-pointer"
        onClick={() => navigate(`/profile/${prompt.user_id}`)}>
        <img
          src={prompt.user?.profileimg?.url ?? profileImage}
          alt={prompt.user?.nickname ? `${prompt.user.nickname} profile` : 'author image'}
          className="w-14 h-14 rounded-[100px] inline-flex flex-col justify-center items-center"
        />

        <span className="text-[18px] font-medium">{prompt.user?.nickname ?? 'Unknown'}</span>
      </div>

      {user && user.role === 'ADMIN' && (
        <div className="mt-2">
          <img
            src={deleteButton}
            alt="delete"
            className="w-6 h-6 cursor-pointer"
            onClick={() => openConfirm(prompt.prompt_id)}
          />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
          <div className="px-36 py-16 bg-white rounded-2xl shadow-[2px_2px_30px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-center items-center gap-6">
            <div className="text-center justify-start text-text-on-white text-3xl font-bold">
              해당 프롬프트 삭제 조치 하시겠습니까?
            </div>
            <div className="self-stretch inline-flex justify-center items-center gap-10">
              <button
                onClick={handleConfirmDelete}
                className="w-40 h-16 px-7 py-2.5 bg-primary rounded-[50px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] flex justify-center items-center gap-3.5 text-white text-xl font-medium">
                예
              </button>
              <button
                onClick={closeConfirm}
                className="w-40 h-16 px-7 py-2.5 bg-white rounded-[50px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] outline-1 outline-offset-[-1px] outline-primary flex justify-center items-center gap-3.5 text-primary text-xl font-medium">
                아니오
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 카드 본문 */}
      <div className="relative w-full max-w-[780px] max-h-[320px] bg-white rounded-2xl shadow-md px-5 py-6 overflow-hidden top-[20px] ml-auto">
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
          className="flex justify-between items-center cursor-pointer"
          onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
          <span className="text-xl font-medium text-gray-900 max-w-[400px] truncate">{prompt.title}</span>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 text-lg">
              {prompt.is_free || prompt.price === 0 ? '무료' : `${prompt.price.toLocaleString()}원`}
            </div>
            <div>
              <Rating star={prompt.review_rating_avg} />
            </div>
            <div className="flex items-center gap-1">
              <img src={iconEye} alt="views" className="w-[24px] h-[24px]" /> {prompt.views}
            </div>
            <div className="flex items-center gap-1">
              <img src={iconDownload} alt="downloads" className="w-[24px] h-[24px]" /> {prompt.downloads}
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className="flex items-center gap-4 overflow-x-auto mb-[25px]">
          {prompt.images?.map((image, index) => (
            <img
              key={index}
              src={image.image_url || ''}
              alt={`Prompt Example Image ${index + 1}`}
              className="object-cover h-[174px] flex-shrink-0"
            />
          ))}
        </div>

        <p
          className="text-base text-gray-800 whitespace-pre-line cursor-pointer max-w-[700px] truncate"
          onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
          {prompt.prompt_result}
        </p>

        {/* 찜 아이콘 */}
        <Likes key={prompt.prompt_id} {...prompt} />
      </div>
    </div>
  );
};

export default PromptCard;
