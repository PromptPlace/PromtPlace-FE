import { useState } from 'react';
import Rating from '@components/Rating';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DualModal from '@components/Modal/DualModal';
import TextModal from '@components/Modal/TextModal';
import UpdateModal from './UpdateModal';
import profile from '../assets/profile.jpg'; // 기본 프로필 이미지

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  profile: string;
  updatedAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  reviewCounts: number;
  onClose: () => void;
  title: string;
}

const ReviewList = ({ reviews: initialReviews, reviewCounts, onClose, title }: ReviewListProps) => {
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // 메뉴 열기/닫기 토글
  const toggleMenu = (idx: number) => {
    setOpenMenuIdx((prev) => (prev === idx ? null : idx));
  };

  // 24시간 이내 수정/삭제 가능 여부 체크
  const isWithin24Hours = (updatedAt: string) => {
    const updatedTime = new Date(updatedAt).getTime();
    const now = Date.now();
    return now - updatedTime <= 24 * 60 * 60 * 1000;
  };

  // 삭제 버튼 클릭 시
  const onClickDelete = (idx: number) => {
    setOpenMenuIdx(null);
    setSelectedReviewIdx(idx);

    if (!reviews[idx]?.updatedAt || !isWithin24Hours(reviews[idx].updatedAt)) {
      setShowExpiredModal(true);
      return;
    }
    setShowDeleteModal(true);
  };

  // 수정 버튼 클릭 시
  const onClickEdit = (idx: number) => {
    setOpenMenuIdx(null);
    setSelectedReviewIdx(idx);
    setSelectedReview(reviews[idx]);
    setShowUpdateModal(true);
  };

  const handleSave = (newRating: number, newComment: string) => {
    if (selectedReviewIdx === null) return;

    const updatedReviews = [...reviews];
    updatedReviews[selectedReviewIdx] = {
      ...updatedReviews[selectedReviewIdx],
      rating: newRating,
      comment: newComment,
      updatedAt: new Date().toISOString(), // 업데이트 시간도 갱신
    };

    setReviews(updatedReviews);
    setSelectedReview(updatedReviews[selectedReviewIdx]);
    setShowUpdateModal(false);
  };

  return (
    <div className="w-[459px] bg-[#FFFEFB] h-[654px] px-8 py-6 flex flex-col">
      {/* 상단 */}
      <div className="flex items-center mb-4">
        <button onClick={onClose} className="text-2xl font-bold leading-none hover:opacity-70" aria-label="뒤로가기">
          &lt;
        </button>
        <h2 className="font-bold text-[20px] ml-3 inline-flex items-center gap-2">구매자 리뷰 ({reviewCounts})</h2>
      </div>

      <div className="h-[1px] bg-[#CCCCCC] w-full mb-4" />

      {/* 리뷰 리스트 */}
      <div
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#fff transparent',
        }}>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #fff;
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
        `}</style>

        {reviews.map((review, idx) => (
          <div
            key={`${review.id}-${idx}`}
            className="relative group"
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}>
            <div className="flex gap-3 mb-4 last:mb-0">
              <img src={review.profile || profile} alt={`${review.user} 프로필`} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.user}</p>
                    <Rating star={review.rating} />
                  </div>
                  {hoverIdx === idx && (
                    <button onClick={() => toggleMenu(idx)} className="hover:opacity-80">
                      <BsThreeDotsVertical className="text-lg text-gray-500" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-gray-700">{review.comment}</p>
              </div>
            </div>

            {openMenuIdx === idx && (
              <div className="absolute top-8 right-0 bg-secondary-pressed text-white rounded-md shadow-md z-20 w-[88px]">
                <ul className="text-sm py-1">
                  <li
                    className="px-4 py-[6px] hover:bg-white hover:text-black cursor-pointer rounded-t-md"
                    onClick={() => onClickDelete(idx)}>
                    삭제하기
                  </li>
                  <li
                    className="px-4 py-[6px] hover:bg-white hover:text-black cursor-pointer rounded-b-md"
                    onClick={() => onClickEdit(idx)}>
                    수정하기
                  </li>
                </ul>
              </div>
            )}

            {idx !== reviews.length - 1 && <div className="h-[1px] bg-[#CCCCCC] w-full my-4" />}
          </div>
        ))}
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <DualModal
          text="리뷰를 삭제하시겠습니까?"
          onClickYes={() => {
            // 실제 삭제 로직 추가 가능
            setShowDeleteModal(false);
            setShowDeleteSuccessModal(true);
          }}
          onClickNo={() => setShowDeleteModal(false)}
        />
      )}

      {/* 삭제 완료 메시지 모달 */}
      {showDeleteSuccessModal && (
        <TextModal text="리뷰가 삭제되었습니다." onClick={() => setShowDeleteSuccessModal(false)} size="sm" />
      )}

      {/* 유효기간 지난 경우 모달 */}
      {showExpiredModal && (
        <TextModal text="지금은 리뷰를 삭제할 수 없습니다." onClick={() => setShowExpiredModal(false)} size="sm" />
      )}

      {/* 리뷰 수정 모달 */}
      {showUpdateModal && selectedReview && (
        <UpdateModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title={title}
          views={2109}
          downloads={120}
          rating={selectedReview.rating}
          initialReviewText={selectedReview.comment}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ReviewList;
