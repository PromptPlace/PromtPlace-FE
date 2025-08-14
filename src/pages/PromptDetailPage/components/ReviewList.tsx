import { useState } from 'react';
import Rating from '@components/Rating';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DualModal from '@components/Modal/DualModal';
import TextModal from '@components/Modal/TextModal';
import UpdateModal from './UpdateModal';
import defaultProfile from '@/assets/icon-profile-gray.svg';
import ArrowLeft from '../assets/keyboard_arrow_down _left.svg';
import useDeleteReview from '@/hooks/mutations/PromptDetailPage/useDeleteReview';
import useUpdateReview from '@/hooks/mutations/PromptDetailPage/useUpdateReview';
import { useMemo } from 'react';

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

const getViewerId = (): number | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { user_id?: unknown };
    const id = typeof parsed.user_id === 'number' ? parsed.user_id : Number(parsed.user_id);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
};

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
  const { mutateAsync: deleteMutate, isPending: deleting } = useDeleteReview();
  const { mutateAsync: updateMutate, isPending: updating } = useUpdateReview();

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const toggleMenu = (idx: number) => {
    setOpenMenuIdx((prev) => (prev === idx ? null : idx));
  };

  const isWithin30Days = (createdAt: string) => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    return now - createdTime <= 30 * 24 * 60 * 60 * 1000;
  };

  const viewerId = useMemo<number | null>(
    () => (Number.isFinite(currentUserId) ? (currentUserId as number) : getViewerId()),
    [currentUserId],
  );

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
    <>
      <div className="hidden lg:flex w-[459px] bg-[#FFFEFB] h-[654px] px-8 py-6 flex-col">
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
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#999898 transparent' }}>
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
              key={review.review_id}
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

                    {(review.writer_id === viewerId || isAdmin) && (
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
      </div>

      {/* ✅ 모바일 전용 리뷰 UI */}
      <div className="lg:hidden w-full min-h-screen px-[20px] pt-[12px] pb-[20px] bg-[#F5F5F5]">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between mb-[20px] relative">
          {/* 뒤로가기 아이콘 */}
          <img
            src={ArrowLeft}
            alt="뒤로가기"
            className="w-[20px] h-[20px] cursor-pointer hover:opacity-70"
            onClick={onClose}
          />

          {/* 가운데 제목 */}
          <h2 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-medium">구매자 리뷰</h2>

          {/* 오른쪽 더미 영역 (아이콘 크기 맞춤) */}
          <div className="w-[20px]" />
        </div>

        {/* 리뷰 리스트 */}
        <div className="flex flex-col items-center">
          {reviews.map((review, idx) => (
            <div
              key={review.review_id}
              className="w-full max-w-[280px] h-[92px] bg-[#FFFEFB] p-[12px] shadow-sm relative">
              {/* 점 버튼 (오른쪽 상단) */}
              <div className="absolute top-[12px] right-[12px]">
                {(review.writer_id === viewerId || isAdmin) && (
                  <button
                    onClick={() => toggleMenu(idx)}
                    className="hover:bg-gray-200 rounded-full p-1 h-[16px] w-[16px]">
                    <BsThreeDotsVertical className="text-[16px] text-gray-500" />
                  </button>
                )}
              </div>

              <div className="flex gap-[8px]">
                {/* 프로필 */}
                <img
                  src={review.writer_profile_image_url || defaultProfile}
                  alt={`${review.writer_nickname} 프로필`}
                  className="w-[36px] h-[36px] rounded-full object-cover"
                />

                {/* 텍스트 정보 */}
                <div className="flex-1 flex flex-col gap-[4px]">
                  <div className="flex items-center gap-[6px] h-[36px]">
                    <p className="text-[12px] font-medium">{review.writer_nickname}</p>
                    <Rating star={review.rating} />
                  </div>
                  <p className="text-[10px] pt-[2px] text-gray-700 line-clamp-2">{review.content}</p>
                </div>
              </div>

              {openMenuIdx === idx && (
                <div className="absolute top-[40px] right-[12px]  bg-secondary text-text-on-background borderrounded-md shadow-md z-50 w-[61px]">
                  <ul className="text-[10px] divide-y divide-gray-200">
                    <li
                      className="h-[21px] flex items-center justify-center cursor-pointer hover:text-black  active:bg-secondary-pressed rounded-t-md"
                      onClick={() => onClickDelete(idx)}>
                      삭제하기
                    </li>
                    <li
                      className="h-[21px] flex items-center justify-center cursor-pointer  active:bg-secondary-pressed rounded-b-md"
                      onClick={() => onClickEdit(idx)}>
                      수정하기
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
                // 30일 초과
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
          key={selectedReview.review_id}
          onClose={() => setShowUpdateModal(false)}
          title={title}
          rating={selectedReview.rating}
          initialReviewText={selectedReview.content}
          onSave={handleSave}
          reviewId={selectedReview.review_id}
        />
      )}
    </>
  );
};

export default ReviewList;
