import { useState, useMemo } from 'react';
import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';
import updateIcon from '../assets/updatebutton.png';
import deleteIcon from '../assets/deletebutton.png';
import TagButton from '@components/Button/TagButton';
import Rating from '@components/Rating';
import heartNone from '../../../assets/icon-heart-none-big.svg';
import heartOnClick from '../../../assets/icon-heart-blue-big.svg';
import rightArrow from '../assets/keyboard_arrow_down.svg';

interface Props {
  title: string;
  views: number;
  downloads: number;
  onClose: () => void;
  onClickReview: () => void;
  model?: string;
  rating?: number;
  tags?: string[];
}

const PromptHeader = ({ title, views, downloads, onClose, onClickReview, model, rating, tags }: Props) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [liked, setLiked] = useState(false);

  const safeModel = model && model.trim().length > 0 ? model : 'ChatGPT';
  const safeRating = Number.isFinite(rating as number) ? Number(rating) : 0;
  const safeTags = useMemo(() => (Array.isArray(tags) ? tags : []), [tags]);

  return (
    <div className="w-[711px] max-lg:max-w-[280px] max-lg:max-h-[191px] bg-[#FFFEFB] px-8 max-lg:pt-[12px] max-lg:px-[12px]">
      {/* PC */}
      <div className="hidden lg:block h-[132px] box-border flex flex-col justify-between">
        <div className="flex items-center justify-between w-full pt-[35px] pb-[5px]">
          <ModelButton text={safeModel} />

          {isAdmin && (
            <div className="flex gap-[24px]">
              <button className="w-[32px] h-[32px]" aria-label="수정" onClick={() => alert('수정 버튼 클릭')}>
                <img src={updateIcon} alt="수정" className="w-full h-full object-contain" />
              </button>
              <button className="w-[28px] h-[28px] p-[4px]" aria-label="삭제" onClick={() => alert('삭제 버튼 클릭')}>
                <img src={deleteIcon} alt="삭제" className="w-full h-full object-contain" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[15px]">
            <button
              onClick={onClose}
              className="text-2xl pb-[10px] font-bold leading-none hover:opacity-70"
              aria-label="뒤로가기">
              &lt;
            </button>
            <h2 className="font-bold text-[32px] pb-[10px]">{title}</h2>
          </div>

          <div className="flex gap-8">
            <Count imgType="eye" count={views} />
            <Count imgType="download" count={downloads} />
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="lg:hidden max-lg:max-h-[167px]">
        {/* 모델 + 조회/다운로드 */}
        <div className="flex items-center gap-[8px]">
          <div className="w-[54px] h-[23px] flex items-center justify-center font-medium text-[10px]">
            <ModelButton text={safeModel} />
          </div>
          <div className="flex gap-[8px] text-[8px] font-normal">
            <Count imgType="eye" count={views} />
            <Count imgType="download" count={downloads} />
          </div>
        </div>

        {/* 제목 */}
        <div className="flex items-center justify-between mt-[8px]">
          <h2 className="text-[16px] font-bold">{`[${title}]`}</h2>
        </div>

        {/* 리뷰/하트/해시태그 */}
        <div className="lg:hidden mt-[8px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <button aria-label="리뷰 보기" onClick={onClickReview} className="flex items-center gap-[4px]">
                <Rating star={safeRating} />
                <img src={rightArrow} alt="arrow" className="w-[12px] h-[12px]" />
              </button>
            </div>

            <img
              src={liked ? heartOnClick : heartNone}
              alt="heart"
              className="w-[16px] h-[16px] cursor-pointer"
              onClick={() => setLiked(!liked)}
            />
          </div>

          <div className="grid grid-cols-5 gap-3 mt-[8px] mb-[12px]">
            {safeTags.length === 0 ? (
              <span className="text-[10px] text-[#9aa0a6] col-span-5">태그가 없습니다.</span>
            ) : (
              safeTags
                .slice(0, 7)
                .map((tag, idx) => <TagButton key={idx} hasDelete={false} text={`#${tag}`} onClick={() => {}} />)
            )}
          </div>
        </div>
        <div className="h-[1px] bg-[#CCCCCC] w-full max-lg:p-0 max-lg:m-0" />
      </div>

      <div className="h-[1px] bg-[#CCCCCC] w-full lg:block hidden" />
    </div>
  );
};

export default PromptHeader;
