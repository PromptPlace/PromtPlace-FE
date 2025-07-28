import { useState } from 'react';
import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';
import updateIcon from '../assets/updatebutton.png';
import deleteIcon from '../assets/deletebutton.png';
import TagButton from '@components/Button/TagButton';
import Rating from '@components/Rating';
import heartNone from '../../../assets/icon-heart-none-big.svg';
import heartOnClick from '../../../assets/icon-heart-blue-big.svg';
import rightArrow from '../assets/keyboard_arrow_down.png';

interface Props {
  title: string;
  views: number;
  downloads: number;
  onClose: () => void;
}

const PromptHeader = ({ title, views, downloads, onClose }: Props) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [liked, setLiked] = useState(false);

  // 모바일용 더미 데이터
  const tags = ['#수묵화', '#수채화', '#디자인', '#일러스트', '#그림', '#이미지'];
  const rating = 5.0;
  const reviewCount = 7;

  return (
    <div className="w-[711px] max-lg:w-full bg-[#FFFEFB] px-8 max-lg:px-4">
      <div className="h-[132px] max-lg:h-auto box-border flex flex-col justify-between">
        <div className="flex items-center justify-between w-full pt-[35px]">
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

      {/* 모바일에서만 표시되는 영역 */}
      <div className="lg:hidden">
        {/* 별점 & 하트 & 리뷰보기 아이콘 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Rating star={rating} />
            <button className="ml-1 p-1" aria-label="리뷰 보기" onClick={() => alert('리뷰 보기 클릭')}>
              <img src={rightArrow} alt="arrow" className="w-5 h-5 object-contain" />
            </button>
          </div>

          <img
            src={liked ? heartOnClick : heartNone}
            alt="heart"
            className="w-[28px] h-[25px] cursor-pointer"
            onClick={() => setLiked(!liked)}
          />
        </div>

        {/* 해시태그 */}
        <div className="grid grid-cols-3 gap-2 mt-4 mb-3">
          {tags.map((tag, idx) => (
            <TagButton key={idx} hasDelete={false} text={tag} onClick={() => {}} />
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />
    </div>
  );
};

export default PromptHeader;
