import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeartEmpty from '@assets/icon-heart-none-small.svg';
import HeartBlue from '@assets/icon-heart-blue-small.svg';
import Dots from '@assets/icon-dot.svg';
import ModelButton from '@/components/Button/ModelButton';
import TagButton from '@/components/Button/TagButton';
import type { Model, Tag } from '@/types/ProfilePage/profile';
import usePromptLike from '@/hooks/mutations/PromptDetailPage/usePromptLike';
import usePromptUnlike from '@/hooks/mutations/PromptDetailPage/usePromptUnlike';
import { useGetLikedPrompts } from '@/hooks/queries/MyPage/useGetPrompts';

interface PrompCardProps {
  id: number;
  title: string;
  model: Model[];
  tags: Tag[];
  isMyProfile: boolean;
  handleDeletePrompts: (id: number) => void;
}

const PromptCard = ({ id, title, model, tags, isMyProfile, handleDeletePrompts }: PrompCardProps) => {
  // 프롬프트 찜하기
  const { mutate: mutatePromptLike } = usePromptLike();
  // 프롬프트 찜 취소하기
  const { mutate: mutatePromptUnlike } = usePromptUnlike();

  // 찜한 프롬프트 목록
  const { data: likedList } = useGetLikedPrompts();
  const isLike = likedList?.data.some((data) => data.prompt_id === id);

  const [isDotsClicked, setIsDotsClickes] = useState(false);

  const clickPosition = useRef<HTMLDivElement | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/prompt/${id}`);
  };

  useEffect(() => {
    const updateModalPosition = () => {
      if (clickPosition.current) {
        const rect = clickPosition.current.getBoundingClientRect();

        console.log(rect);

        setModalPosition({
          top: rect.top + window.scrollY + 40,
          left: rect.left + window.scrollX - 65,
        });
      }
    };

    if (isDotsClicked) {
      updateModalPosition();
      window.addEventListener('scroll', updateModalPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateModalPosition);
    };
  }, [isDotsClicked]);

  return (
    <div className="bg-white border-b border-b-white-stroke py-[10px] max-lg:p-[12px] flex justify-between items-center max-lg:items-start cursor-pointer max-lg:flex-col max-lg:gap-[6px] max-lg:mr-[4px]">
      <div className="lg:hidden gap-[10px] flex">
        <div className="lg:hidden">
          <ModelButton text={model[0]?.model.name} />
        </div>

        <div className="lg:hidden flex gap-[5px]">
          {tags.slice(0, 3).map((tag) => (
            <div key={tag.tag.name} className="text-text-on-background text-[20px] font-medium leading-[25px]">
              <TagButton key={String(tag.tag.name)} hasDelete={false} text={`# ${tag.tag.name}`}></TagButton>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full lg:justify-between">
        <div
          onClick={() => handleNavigate(id)}
          className="text-text-on-white text-[22px] font-bold leading-[28px] py-[20px] px-[51px] max-lg:p-0 truncate max-w-[606px] lg:min-w-[280px] w-full truncate max-lg:text-[12px] max-lg:font-medium max-lg:leading-[15px]">
          {title}
        </div>
        <div className="max-lg:hidden text-text-on-background text-[20px] font-medium leading-[25px] py-[20px] px-[10px] max-w-[223px] text-center w-full whitespace-nowrap">
          {model[0]?.model.name}
        </div>

        <div className="max-lg:hidden py-[20px] px-[10px] max-w-[263px] w-full whitespace-nowrap">
          {tags.slice(0, 3).map((tag) => (
            <span key={String(tag.tag.name)} className="text-text-on-background text-[20px] font-medium leading-[25px]">
              #{tag.tag.name}
            </span>
          ))}
        </div>

        {!isMyProfile && (
          <div
            onClick={() => {
              if (isLike) {
                mutatePromptUnlike(id);
              } else {
                mutatePromptLike(id);
              }
            }}
            className="py-[25px] px-[45px] max-lg:p-0 cursor-pointer lg:w-[115px] lg:h-[72px] max-lg:w-[16px] max-lg:h-[16px] flex items-center justify-center shrink-0">
            <img src={isLike ? HeartBlue : HeartEmpty} alt="좋아요" className="w-full h-full object-contain" />
          </div>
        )}

        {isMyProfile && (
          <div
            onClick={() => setIsDotsClickes((prev) => !prev)}
            className=" py-[22px] px-[44px] max-lg:p-0 cursor-pointer max-w-[115px] max-lg:max-w-[16px] w-full h-[72px] max-lg:h-auto flex items-center justify-center">
            <div
              ref={clickPosition}
              className="w-[28px] h-[28px] max-lg:w-[16px] max-lg:h-[16px] max-lg:py-[2px] max-lg:px-[6px] hover:bg-secondary-pressed flex items-center justify-center rounded-full">
              <img src={Dots} alt="메뉴" />
            </div>
            {isDotsClicked && (
              <>
                <div
                  style={{ top: modalPosition.top, left: modalPosition.left }}
                  className="max-lg:hidden absolute flex flex-col whitespace-nowrap">
                  <button
                    onClick={() => handleDeletePrompts(id)}
                    className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-t-[4px] border-b border-b-white-stroke text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white hover:bg-secondary-pressed hover:text-text-on-white">
                    삭제하기
                  </button>
                  <button
                    onClick={() => navigate(`/mypage/edit/${id}`)}
                    className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-b-[4px] text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white hover:bg-secondary-pressed hover:text-text-on-white">
                    수정하기
                  </button>
                </div>
                <div
                  style={{ top: modalPosition.top - 18, left: modalPosition.left + 20 }}
                  className="lg:hidden absolute flex flex-col whitespace-nowrap">
                  <button
                    onClick={() => handleDeletePrompts(id)}
                    className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-t-[4px] border-b border-b-white-stroke text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white hover:bg-secondary-pressed hover:text-text-on-white">
                    삭제하기
                  </button>
                  <button
                    onClick={() => navigate(`/mypage/edit/${id}`)}
                    className="py-[8px] px-[16px] max-lg:py-[4px] max-lg:px-[12px] bg-secondary rounded-b-[4px] text-text-on-background text-[16px] font-normal leading-[20px] max-lg:text-[10px] max-lg:leading-[13px] active:bg-secondary-pressed active:text-text-on-white hover:bg-secondary-pressed hover:text-text-on-white">
                    수정하기
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
