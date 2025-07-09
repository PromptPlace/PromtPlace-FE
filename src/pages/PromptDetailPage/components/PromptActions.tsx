import { useState } from 'react';
import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import profile from '../assets/profile.jpg';

interface Props {
  price: number;
  isFree: boolean;
  downloads: number;
  likes: number;
  reviewCounts: number;
  rating: number;
  updatedAt: string;
  userId: number;
}

const PromptActions = ({ price, isFree, downloads, likes, reviewCounts, rating, updatedAt, userId }: Props) => {
  const [follow, setFollow] = useState(false);

  return (
    <div className="space-y-5">
      {/* 유저 정보 */}
      <div className="flex items-center gap-3">
        <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">디자인킹</p>
          <FollowButton follow={follow} onClick={() => setFollow(!follow)} />
        </div>
      </div>

      <div className="text-lg font-semibold">{isFree ? '무료' : `${price.toLocaleString()}원`}</div>

      <IconButton
        buttonType="squareBig"
        style="fill"
        imgType="download"
        text="다운로드"
        onClick={() => alert('다운로드')}
      />

      <div>
        <Rating star={rating} />
        <p className="text-sm text-gray-500">리뷰보기 {reviewCounts}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        <span>#수채화</span>
        <span>#수묵화</span>
        <span>#디자인</span>
        <span>#일러스트</span>
        <span>#그림</span>
        <span>#이미지</span>
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
