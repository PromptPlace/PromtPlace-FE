import { useState } from 'react';
import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import profile from '../assets/profile.jpg';
import TagButton from '@components/Button/TagButton';
import { AiOutlineHeart } from 'react-icons/ai';

interface Props {
  title: string;
  price: number;
  isFree: boolean;
  downloads: number;
  likes: number;
  reviewCounts: number;
  rating: number;
  updatedAt: string;
  userId: number;
}

const PromptActions = ({ title, price, isFree, downloads, likes, reviewCounts, rating, updatedAt, userId }: Props) => {
  const [follow, setFollow] = useState(false);

  const [tags, setTags] = useState<string[]>(['#수묵화', '#수채화', '#디자인', '#일러스트', '#그림', '#이미지']);

  const handleDelete = (text: string) => {
    setTags(tags.filter((tag) => tag !== text));
  };

  return (
    <div className="w-[459px] bg-[#FFFEFB] h-[654px] bg-[#FFFEFB] px-8">
      {/* 유저 정보 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="flex items-center w-full">
          <p className="font-semibold text-[20px] mr-8">디자인킹</p>
          <FollowButton follow={follow} onClick={() => setFollow(!follow)} />
        </div>
      </div>
      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      <div className="font-bold text-[24px]  pt-[20px] pb-[10px]">{`[${title}]`}</div>

      <div className="text-[24px] pt-[20px] pb-[20px] font-bold">{isFree ? '무료' : `${price.toLocaleString()}원`}</div>

      <div className="h-[96px] box-border flex items-center gap-3">
        <IconButton
          buttonType="squareBig"
          style="fill"
          imgType="download"
          text="다운로드"
          onClick={() => alert('다운로드')}
        />
        <AiOutlineHeart className="ml-[30px] w-[28px] h-[25px] text-[24px] text-[#999898]" />
      </div>

      <div>
        <div className="mt-[25px] flex justify-start">
          <Rating star={rating} />
        </div>

        <div className="pt-[20px] text-[20px] flex items-center gap-[10px]">
          <p>리뷰보기</p>
          <span className="w-[37px] h-[28px] px-[10px] py-[5px] border border-[#999999] rounded-full text-[16px] text-[#999898] flex items-center justify-center">
            {reviewCounts}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-[40px]  mb-[30px]">
        {tags.map((tag, idx) => (
          <TagButton key={idx} hasDelete={true} text={tag} onClick={() => handleDelete(tag)} />
        ))}
      </div>

      <IconButton
        buttonType="squareMd"
        style="red"
        imgType="alert"
        text="프롬프트 신고하기"
        onClick={() => alert('신고')}
      />
    </div>
  );
};

export default PromptActions;
