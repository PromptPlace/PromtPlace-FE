import { useState } from 'react';
import Rating from '@components/Rating';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DualModal from '@components/Modal/DualModal';
import TextModal from '@components/Modal/TextModal';
import UpdateModal from './UpdateModal';
import defaultProfile from '../assets/profile.jpg';

interface Review {
  review_id: number;
  writer_id: number;
  writer_profile_image_url: string;
  writer_nickname: string;
  rating: number;
  content: string;
  created_at: string;
}

interface ReviewListProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  reviewCount: number;
  setReviewCount: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  title: string;
  currentUserId: number;
}

const ReviewList = ({
  reviews,
  setReviews,
  reviewCount,
  onClose,
  title,
  currentUserId,
  setReviewCount,
}: ReviewListProps) => {
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const toggleMenu = (idx: number) => {
    setOpenMenuIdx((prev) => (prev === idx ? null : idx));
  };

  const isWithin30Days = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    return now - createdTime <= 30 * 24 * 60 * 60 * 1000;
  };

  const onClickDelete = (idx: number) => {
    setOpenMenuIdx(null);
    setSelectedReviewIdx(idx);

    if (!reviews[idx]?.created_at || !isWithin30Days(reviews[idx].created_at)) {
      setShowExpiredModal(true);
      return;
    }

    setShowDeleteModal(true);
  };

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
      content: newComment,
      created_at: new Date().toISOString(),
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
        <h2 className="font-bold text-[20px] ml-3 inline-flex items-center gap-2">구매자 리뷰 ({reviewCount})</h2>
      </div>

      <div className="h-[1px] bg-[#CCCCCC] w-full mb-4" />

      {/* 리뷰 리스트 */}
      <div
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#fff transparent' }}>
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
            key={`${review.review_id}-${idx}`}
            className="relative group"
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}>
            <div className="flex gap-3 mb-4 last:mb-0">
              <img
                src={review.writer_profile_image_url || defaultProfile}
                alt={`${review.writer_nickname} 프로필`}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.writer_nickname}</p>
                    <Rating star={review.rating} />
                  </div>

                  {hoverIdx === idx && (review.writer_id === currentUserId || isAdmin) && (
                    <button
                      onClick={() => toggleMenu(idx)}
                      className="hover:bg-secondary-pressed rounded-full p-1 transition-colors duration-150">
                      <BsThreeDotsVertical className="text-lg text-gray-500" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-gray-700">{review.content}</p>
              </div>
            </div>

            {/* 점 버튼 메뉴 */}
            {openMenuIdx === idx && (
              <div className="absolute top-8 right-0 bg-secondary text-text-on-background rounded-md shadow-md z-20 w-[91px] h-[72px]">
                <ul className="text-[16px]">
                  <li
                    className="px-4 py-[6px] active:bg-secondary-pressed hover:text-black cursor-pointer rounded-t-md"
                    onClick={() => onClickDelete(idx)}>
                    삭제하기
                  </li>
                  <li
                    className="px-4 py-[6px] active:bg-secondary-pressed hover:text-black cursor-pointer rounded-b-md"
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
          text={isAdmin ? '리뷰를 삭제 조치하시겠습니까?' : '리뷰를 삭제하시겠습니까?'}
          onClickYes={() => {
            if (selectedReviewIdx !== null) {
              const updated = [...reviews];
              updated.splice(selectedReviewIdx, 1);
              setReviews(updated);
              setReviewCount((prev) => prev - 1);
              setSelectedReviewIdx(null);
            }

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
          initialReviewText={selectedReview.content}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ReviewList;
