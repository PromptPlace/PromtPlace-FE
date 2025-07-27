import CardHeader from './CardHeader';
import Rating from '@/components/Rating';
import PrimaryButton from '@/components/Button/PrimaryButton';

interface Review {
  id: number;
  promptTitle: string;
  rating: number;
  content: string;
  author?: { name: string; avatar: string }; // '받은 리뷰'에만 존재
  createdAt: string;
}

interface ReviewCardProps {
  type: 'written' | 'received';
  reviewData: Review;
  onDelete: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ type, reviewData, onDelete }) => {
  return (
    <div className="flex flex-col border-b-[1px] border-white-stroke py-[10px] pl-[40px] gap-[10px] bg-white">
      <div className="mt-[20px]">
        <CardHeader
          date={reviewData.createdAt}
          title={reviewData.promptTitle}
          linkUrl={`/prompt/${reviewData.id}`} // 상세 페이지 경로 전달
          dateFormat="dateOnly"
          showArrow={type === 'written'} // '작성한 리뷰'일 때만 화살표 아이콘 표시
        />
      </div>

      <div className="flex items-center gap-[10px]">
        {/* '받은 리뷰'일 때만 작성자 프로필 표시 */}
        {type === 'received' && reviewData.author && (
          <div className="flex items-center gap-[10px]">
            <img
              src={reviewData.author.avatar}
              alt={reviewData.author.name}
              className="w-[46px] h-[46px] rounded-full"
            />
            <span className="text-[20px] font-medium text-text-on-white">{reviewData.author.name}</span>
          </div>
        )}

        <Rating star={reviewData.rating} />

        {type === 'written' && <PrimaryButton buttonType="reviewDelete" text="리뷰 삭제" onClick={onDelete} />}
      </div>

      <p className="text-[18px] text-text-on-white font-regular">{reviewData.content}</p>
    </div>
  );
};

export default ReviewCard;
