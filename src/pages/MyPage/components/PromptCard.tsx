import BigBlueHeart from '@/assets/icon-heart-blue-big.svg';
import PrimaryButton from '@components/Button/PrimaryButton';
import kebabMenu from '@/assets/icon-kebabMenu.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface Prompt {
  id: number;
  title: string;
  model: string;
  tags?: string[];
  author?: string;
}

type TabType = 'authored' | 'downloaded' | 'liked';

interface PromptCardProps {
  type: TabType;
  promptData: Prompt;
  DeletePrompt: (id: number) => void;
  EditPrompt: (id: number) => void;
  DeleteLike: (id: number) => void;
}

export const PromptCard = ({ type, promptData, DeletePrompt, EditPrompt, DeleteLike }: PromptCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex lg:items-center max-lg:flex-col max-lg:gap-[6px]  border-b-[1px] max-lg:border-b-[0.5px] border-b-white-stroke w-full  py-[10px] max-lg:p-[12px] h-[92px] max-lg:h-auto bg-white">
      <Link to={`/prompt/${promptData.id}`} className="flex flex-row">
        <div className="max-lg:hidden flex items-center  text-text-on-white text-[22px] max-lg:text-[12px] pl-[80px] max-lg:pl-[0px] font-bold max-lg:font-medium w-[635px] max-lg:w-[231px]">
          {promptData.title}
        </div>
        <div className="flex items-center justify-center max-lg:bg-primary text-text-on-background max-lg:text-white text-[20px] max-lg:text-[8px] font-medium  w-[223px] max-lg:w-auto max-lg:rounded-[50px] max-lg:px-[6px] max-lg:py-[5px]">
          {promptData.model}
        </div>

        <div
          className={`${type === 'downloaded' ? 'lg:hidden' : ''} flex items-center justify-center  text-text-on-background text-[20px] max-lg:text-[8px] font-medium py-[23.5px] max-lg:py-[0px] max-lg:pl-[10px] w-[263px] max-lg:w-auto`}>
          {promptData.tags?.map((tag) => (
            <div className="max-lg:px-[6px] max-lg:py-[5px] max-lg:gap-[5px] max-lg:rounded-[50px] max-lg:shadow-[0_1px_3px_0_rgba(0,0,0,0.08)] ">
              #{tag}
            </div>
          ))}
        </div>
      </Link>

      <div className="flex max-lg:justify-between max-lg:items-center">
        <Link to={`/prompt/${promptData.id}`} className="lg:hidden flex-1 min-w-0">
          <div className="truncate  text-text-on-white text-[12px] font-medium  w-full ">{promptData.title}</div>
        </Link>
        {type === 'authored' && (
          <div className="flex items-center justify-center h-[72px] max-lg:h-auto  w-[115px] max-lg:w-auto py-[10px] max-lg:py-[0px]  ">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-center h-[28px] w-[28px] rounded-[50px]  ${isDropdownOpen ? 'bg-secondary-pressed' : 'bg-transparent'}`}>
                <img src={kebabMenu} alt="케밥 메뉴" className="max-lg:w-[16px] max-lg:h-[16px]" />
              </button>
              {isDropdownOpen && (
                <div className="absolute  right-0 top-full mt-[11px] w-[91px] bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      DeletePrompt(promptData.id);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full h-[36px] text-[16px] border-b-[1px] border-b-white-stroke text-text-on-background bg-secondary active:bg-secondary-pressed rounded-t-[4px]">
                    삭제하기
                  </button>
                  <button
                    onClick={() => {
                      EditPrompt(promptData.id);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full h-[36px] text-[16px] text-text-on-background bg-secondary active:bg-secondary-pressed rounded-b-[4px]">
                    수정하기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {type === 'downloaded' && (
          <>
            <div className="max-lg:hidden flex items-center justify-center h-[72px]  w-[198px]">
              <PrimaryButton buttonType="review" text="리뷰 작성하기" onClick={() => {}} />
            </div>
            <div className="lg:hidden flex items-center  ">
              <PrimaryButton buttonType="review" text="리뷰 작성" onClick={() => {}} />
            </div>
          </>
        )}
        {type === 'downloaded' && (
          <div className="max-lg:hidden flex items-center justify-center text-text-on-white text-[20px] font-medium py-[23.5px] w-[180px] px-[44px]">
            {promptData.author}
          </div>
        )}

        {type === 'liked' && (
          <button onClick={() => DeleteLike(promptData.id)}>
            <img
              src={BigBlueHeart}
              alt="좋아요 큰하트"
              className=" h-[22px] max-lg:h-[16px] w-[115px] max-lg:w-[16px]"
            />
          </button>
        )}
      </div>
    </div>
  );
};
