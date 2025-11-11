import { useState, useMemo } from 'react';
import Rating from '@components/Rating';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DualModal from '@components/Modal/DualModal';
import TextModal from '@components/Modal/TextModal';
import UpdateModal from './UpdateModal';
import defaultProfile from '@/assets/icon-profile-gray.svg';
import useDeleteReview from '@/hooks/mutations/PromptDetailPage/useDeleteReview';
import useUpdateReview from '@/hooks/mutations/PromptDetailPage/useUpdateReview';
import { canEditReview } from '@/utils/reviewUtils';
import { useAuth } from '@/context/AuthContext'; // ✅ 추가

export interface Review {
  review_id: number;
  writer_id: number;
  writer_profile_image_url: string | null;
  writer_nickname: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at?: string;
}

interface ReviewListProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  reviewCount: number;
  setReviewCount: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  title: string;
  currentUserId?: number;
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { mutateAsync: deleteMutate } = useDeleteReview();
  const { mutateAsync: updateMutate } = useUpdateReview();

  const { user: me } = useAuth();
  const viewerId = me?.user_id ?? currentUserId ?? null;

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

  const handleSave = async (newRating: number, newComment: string) => {
    if (selectedReviewIdx === null) return;
    const target = reviews[selectedReviewIdx];

    try {
      const res = await updateMutate({
        reviewId: target.review_id,
        body: { rating: newRating, content: newComment },
      });

      const updated = [...reviews];
      updated[selectedReviewIdx] = {
        ...updated[selectedReviewIdx],
        rating: res.data.rating ?? newRating,
        content: res.data.content ?? newComment,
        created_at: res.data.updated_at ?? new Date().toISOString(),
      };

      setReviews(updated);
      setSelectedReview(updated[selectedReviewIdx]);
      setShowUpdateModal(false);
      setSelectedReviewIdx(null);
      setOpenMenuIdx(null);
    } catch {
      alert('리뷰 수정에 실패했습니다.');
    }
  };

  return (
    <div className="w-full max-w-full xl:max-w-[766px] rounded-[16px] bg-[#FFFEFB] h-auto px-4 sm:px-6 md:px-8 py-6 flex-col mx-auto">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #fff;
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
        `}</style>

        {reviews.map((review, idx) => (
          <div
            key={review.review_id}
            className={`relative group mb-6 transition-all duration-200 ${
              openMenuIdx === idx ? 'pb-8 min-h-[120px]' : 'pb-0 min-h-[120px]'
            }`}>
            <div className="flex gap-3 items-start h-full">
              <img
                src={review.writer_profile_image_url || defaultProfile}
                alt="프로필"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[14px] sm:text-[16px]">{review.writer_nickname}</p>
                    <Rating star={review.rating} />
                  </div>

                  {review.writer_id === viewerId && (
                    <button
                      onClick={() => toggleMenu(idx)}
                      className={`rounded-full p-1 transition-colors duration-150 ${
                        openMenuIdx === idx ? 'bg-gray-200' : 'hover:bg-gray-100'
                      }`}>
                      <BsThreeDotsVertical className="text-lg text-gray-500" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-[14px] text-gray-700 leading-[20px] whitespace-pre-line break-keep">
                  {review.content}
                </p>
              </div>
            </div>

            {openMenuIdx === idx && (
              <div
                className="absolute top-8 right-0 bg-secondary
                text-gray-700 rounded-md shadow-md z-[100] w-[100px]">
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

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <DualModal
          text={isAdmin ? '리뷰를 삭제 조치하시겠습니까?' : '리뷰를 삭제하시겠습니까?'}
          onClickYes={async () => {
            if (selectedReviewIdx === null) return;
            const review = reviews[selectedReviewIdx];
            try {
              await deleteMutate(review.review_id);
              const updated = reviews.filter((r) => r.review_id !== review.review_id);
              setReviews(updated);
              setReviewCount((prev) => Math.max(0, prev - 1));
              setSelectedReviewIdx(null);
              setOpenMenuIdx(null);
              setShowDeleteModal(false);
              setShowDeleteSuccessModal(true);
            } catch (e: any) {
              const status = e?.response?.status;
              if (status === 403) {
                setShowDeleteModal(false);
                setShowExpiredModal(true);
                return;
              }
              alert('리뷰 삭제에 실패했습니다.');
              setShowDeleteModal(false);
            }
          }}
          onClickNo={() => setShowDeleteModal(false)}
        />
      )}

      {/* 결과 모달 */}
      {showDeleteSuccessModal && (
        <TextModal text="리뷰가 삭제되었습니다." onClick={() => setShowDeleteSuccessModal(false)} size="sm" />
      )}

      {showExpiredModal && (
        <TextModal text="지금은 리뷰를 삭제할 수 없습니다." onClick={() => setShowExpiredModal(false)} size="sm" />
      )}

      {showUpdateModal && selectedReview && (
        <UpdateModal
          isOpen={showUpdateModal}
          key={selectedReview.review_id}
          onClose={() => setShowUpdateModal(false)}
          title={title}
          rating={selectedReview.rating}
          initialReviewText={selectedReview.content}
          onSave={handleSave}
          reviewId={selectedReview.review_id}
        />
      )}
    </div>
  );
};

export default ReviewList;
