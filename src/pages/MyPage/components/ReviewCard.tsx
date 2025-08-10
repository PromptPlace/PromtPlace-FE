import CardHeader from './CardHeader';
import Rating from '@/components/Rating';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Link } from 'react-router-dom';

interface Review {
  review_id?: number;
  prompt_id: number;
  prompt_title: string;
  rating: number;
  content: string;
  writer_id?: string; // '받은 리뷰'에만 존재
  writer_nickname?: string; // '받은 리뷰'에만 존재
  writer_profile_image_url?: string; // '받은 리뷰'에만 존재
  created_at: string;
  updated_at?: string;
}

interface ReviewCardProps {
  type: 'written' | 'received';
  reviewData: Review;
  onDelete: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ type, reviewData, onDelete }) => {
  return (
    <div className="flex flex-col border-b-[1px] border-white-stroke py-[10px] pl-[40px] max-lg:p-[12px] gap-[10px] max-lg:gap-[6px] bg-white">
      <div className="mt-[20px] max-lg:mt-[0px]">
        <CardHeader
          date={reviewData.created_at}
          title={reviewData.prompt_title}
          linkUrl={`/prompt/${reviewData.prompt_id}`} // 상세 페이지 경로 전달
          dateFormat="dateOnly"
          showArrow={type === 'written'} // '작성한 리뷰'일 때만 화살표 아이콘 표시
          showDateOnMobile={true}
        />
      </div>

      <div className="flex items-center gap-[10px]">
        {/* '받은 리뷰'일 때만 작성자 프로필 표시 */}
        {type === 'received' && reviewData.writer_id && (
          <div className="flex items-center gap-[10px]">
            <Link to={`/profile/${reviewData.writer_id}`} className="flex items-center gap-[10px]">
              <img
                src={reviewData.writer_profile_image_url}
                alt={reviewData.writer_nickname}
                className="w-[46px] h-[46px] rounded-full max-lg:hidden"
              />
              <span className="text-[20px] max-lg:text-[12px] font-medium text-text-on-white">
                {reviewData.writer_nickname}
              </span>
            </Link>
          </div>
        )}

        <Rating star={reviewData.rating} />

        <div className="max-lg:hidden">
          {type === 'written' && <PrimaryButton buttonType="reviewDelete" text="리뷰 삭제" onClick={onDelete} />}
        </div>
      </div>

      <p className="text-[18px] max-lg:text-[10px] text-text-on-white font-normal">{reviewData.content}</p>
      <div className="lg:hidden flex justify-end">
        {type === 'written' && <PrimaryButton buttonType="reviewDelete" text="리뷰 삭제" onClick={onDelete} />}
      </div>
    </div>
  );
};

export default ReviewCard;
