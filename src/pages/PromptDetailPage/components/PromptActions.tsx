import { useState } from 'react';
import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import profile from '../assets/profile.jpg';
import TagButton from '@components/Button/TagButton';
import { AiOutlineHeart } from 'react-icons/ai';
import ReviewList from './ReviewList';
import ReportModal from '../components/ReportModal';

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

const dummyReviews = Array(8).fill({
  id: 1,
  user: '홍길동',
  rating: 4,
  comment: '가격도 저렴하고 퀄리티 좋아요. 잘 쓰고 있습니다. 근데 좀 단조로운 것 같아요.',
  profile,
});

const PromptActions = ({ title, price, isFree, downloads, likes, reviewCounts, rating, updatedAt, userId }: Props) => {
  const [follow, setFollow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [tags, setTags] = useState<string[]>(['#수묵화', '#수채화', '#디자인', '#일러스트', '#그림', '#이미지']);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고 모달 상태

  const handleDelete = (text: string) => {
    setTags(tags.filter((tag) => tag !== text));
  };

  const handleReportButtonClick = () => {
    setIsReportModalOpen(true); // 신고 모달 열기
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false); // 신고 모달 닫기
  };

  if (showReviews) {
    return (
      <ReviewList
        reviews={dummyReviews}
        title="동양풍 일러스트 이미지 생성"
        reviewCounts={reviewCounts}
        onClose={() => setShowReviews(false)}
      />
    );
  }

  return (
    <div className="w-[459px] bg-[#FFFEFB] h-[654px] px-8">
      {/* 유저 정보 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="flex items-center w-full">
          <p className="font-semibold text-[20px] mr-8">디자인킹</p>
          <FollowButton follow={follow} onClick={() => setFollow(!follow)} />
        </div>
      </div>
      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 제목 */}
      <div className="font-bold text-[24px] pt-[20px] pb-[10px]">{`[${title}]`}</div>

      {/* 가격 */}
      <div className="text-[24px] pt-[20px] pb-[20px] font-bold">{isFree ? '무료' : `${price.toLocaleString()}원`}</div>

      {/* 다운로드 & 좋아요 */}
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

      {/* 별점 및 리뷰보기 */}
      <div>
        <div className="mt-[25px] flex justify-start">
          <Rating star={rating} />
        </div>
        <div
          className="pt-[20px] text-[20px] flex items-center gap-[10px] cursor-pointer"
          onClick={() => setShowReviews(true)}>
          <p>리뷰보기</p>
          <span className="w-[37px] h-[28px] px-[10px] py-[5px] border border-[#999999] rounded-full text-[16px] text-[#999898] flex items-center justify-center">
            {reviewCounts}
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-[40px] mb-[30px]">
        {tags.map((tag, idx) => (
          <TagButton key={idx} hasDelete={true} text={tag} onClick={() => handleDelete(tag)} />
        ))}
      </div>

      {/* 신고 버튼 */}
      <IconButton
        buttonType="squareMd"
        style="red"
        imgType="alert"
        text="프롬프트 신고하기"
        onClick={handleReportButtonClick}
      />

      {/* 신고 모달 */}
      <ReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} />
    </div>
  );
};

export default PromptActions;
