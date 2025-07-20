import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeartEmpty from '@assets/icon-heart-none-small.svg';
import HeartBlue from '@assets/icon-heart-blue-small.svg';
import Dots from '@assets/icon-dot.svg';

interface PrompCardProps {
  id: number;
  title: string;
  model: string;
  tags: { tag_id: number; name: string }[];
  isMyProfile: boolean;
  handleDeletePrompts: (id: number) => void;
}

const PromptCard = ({ id, title, model, tags, isMyProfile, handleDeletePrompts }: PrompCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const [isDotsClicked, setIsDotsClickes] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/prompt/${id}`);
  };

  return (
    <div className="bg-white border-b border-b-white-stroke py-[10px] flex justify-between items-center cursor-pointer">
      <div
        onClick={() => handleNavigate(id)}
        className="text-text-on-white text-[22px] font-bold leading-[28px] py-[20px] px-[51px] truncate max-w-[606px] w-full truncate">
        {title}
      </div>
      <div className="text-text-on-background text-[20px] font-medium leading-[25px] py-[20px] px-[10px] max-w-[223px] w-full text-center">
        {model}
      </div>
      <div className="flex gap-[1px] py-[20px] px-[10px] max-w-[263px] w-full text-center truncate">
        {tags.map((tag) => (
          <div key={String(tag.tag_id)} className="text-text-on-background text-[20px] font-medium leading-[25px]">
            #{tag.name}
          </div>
        ))}
      </div>

      {!isMyProfile && (
        <div
          onClick={() => setIsLike((prev) => !prev)}
          className="py-[25px] px-[45px] cursor-pointer w-[115px] h-[72px] flex items-center justify-center shrink-0">
          <img src={isLike ? HeartBlue : HeartEmpty} alt="좋아요" />
        </div>
      )}

      {isMyProfile && (
        <div
          onClick={() => setIsDotsClickes((prev) => !prev)}
          className="relative py-[22px] px-[44px] cursor-pointer max-w-[115px] w-full h-[72px] flex items-center justify-center">
          <div className="w-[28px] h-[28px] hover:bg-secondary-pressed flex items-center justify-center rounded-full">
            <img src={Dots} alt="좋아요" />
          </div>
          {isDotsClicked && (
            <div className="absolute z-10 top-[60px] right-[44px] flex flex-col whitespace-nowrap">
              <button
                onClick={() => handleDeletePrompts(id)}
                className="py-[8px] px-[16px] bg-secondary rounded-t-[4px] border-b border-b-white-stroke text-text-on-background text-[16px] font-normal leading-[20px] active:bg-secondary-pressed active:text-text-on-white">
                삭제하기
              </button>
              <button
                onClick={() => navigate('/create')}
                className="py-[8px] px-[16px] bg-secondary rounded-b-[4px] text-text-on-background text-[16px] font-normal leading-[20px] active:bg-secondary-pressed active:text-text-on-white">
                수정하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptCard;
