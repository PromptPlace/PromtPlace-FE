import { useState } from 'react';
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
}

const PromptHeader = ({ title, views, downloads, onClose, onClickReview }: Props) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [liked, setLiked] = useState(false);

  // 모바일용 더미 데이터
  const rating = 5.0;

  return (
    <div className="w-[711px] max-lg:max-w-[280px] max-lg:max-h-[191px] bg-[#FFFEFB] px-8 max-lg:p-[12px]">
      {/* PC */}
      <div className="hidden lg:block h-[132px] box-border flex flex-col justify-between">
        <div className="flex items-center justify-between w-full pt-[35px] pb-[5px]">
          <ModelButton text="ChatGPT" />

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
      <div className="lg:hidden pt-4 ">
        {/* ChatGPT + 조회/다운로드 */}
        <div className="flex items-center gap-[8px]">
          <div className="w-[54px] h-[23px] flex items-center justify-center">
            <ModelButton text="ChatGPT" />
          </div>
          <div className="flex gap-[8px] text-[8px] font-normal">
            <Count imgType="eye" count={views} />
            <Count imgType="download" count={downloads} />
          </div>
        </div>

        {/*제목 */}
        <div className="flex items-center justify-between mt-[8px]">
          <h2 className="text-[16px] font-bold">{`[${title}]`}</h2>
        </div>

        {/* 리뷰/하트/해시태그 */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-[6px]">
              <Rating star={rating} />
              <button aria-label="리뷰 보기" onClick={onClickReview}>
                <img src={rightArrow} alt="arrow" className="flex w-[12px] h-[12px] items-center" />
              </button>
            </div>

            <img
              src={liked ? heartOnClick : heartNone}
              alt="heart"
              className="w-[16px] h-[16px] cursor-pointer"
              onClick={() => setLiked(!liked)}
            />
          </div>

          <div className="grid grid-cols-5 gap-2 mt-4 mb-3">
            <TagButton hasDelete={false} text="#수채화" onClick={() => {}} />
            <TagButton hasDelete={false} text="#수묵화" onClick={() => {}} />
            <TagButton hasDelete={false} text="#디자인" onClick={() => {}} />
            <TagButton hasDelete={false} text="#일러스트" onClick={() => {}} />
            <TagButton hasDelete={false} text="#그림" onClick={() => {}} />
            <TagButton hasDelete={false} text="#이미지" onClick={() => {}} />
            <TagButton hasDelete={false} text="#수채화" onClick={() => {}} />
          </div>
          <div className="h-[1px] bg-[#CCCCCC] w-full" />
        </div>
      </div>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />
    </div>
  );
};

export default PromptHeader;
