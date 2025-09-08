import { useState, useEffect } from 'react';
import ModelButton from '@components/Button/ModelButton';
import Rating from '@components/Rating';
import PrimaryButton from '@components/Button/PrimaryButton';
import Bar from '../assets/bar.svg';
import useUpdateReview from '@/hooks/mutations/PromptDetailPage/useUpdateReview';
import EditableRating from '@components/EditableRating';
import { motion, AnimatePresence } from 'motion/react';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  reviewId: number;
  rating: number;
  initialReviewText: string;
  onSave: (rating: number, reviewText: string) => void;
}

const UpdateModal = ({ isOpen, onClose, title, reviewId, rating, initialReviewText, onSave }: UpdateModalProps) => {
  const [reviewText, setReviewText] = useState(initialReviewText);
  const { mutateAsync: updateMutate, isPending } = useUpdateReview();
  const [updatedRating, setUpdatedRating] = useState<number>(rating);

  useEffect(() => {
    setReviewText(initialReviewText);
    setUpdatedRating(rating);
  }, [initialReviewText, rating]);

  if (!isOpen) return null;

  const handleSaveClick = async () => {
    try {
      await updateMutate({
        reviewId,
        body: {
          rating: updatedRating,
          content: reviewText,
        },
      });

      onSave(updatedRating, reviewText);
      onClose();
    } catch (e: unknown) {
      if (e instanceof Error && 'response' in e) {
        const err = e as { response?: { status?: number } };
        const status = err.response?.status;

        if (status === 401) {
          alert('로그인이 필요합니다.');
          return;
        }
        if (status === 403) {
          alert('작성 후 30일이 지나 수정할 수 없습니다.');
          return;
        }
      }

      alert('리뷰 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className=" bg-overlay fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 p-4">
      {/* ✅ PC 버전 */}
      <div
        className="hidden lg:flex relative bg-white rounded-2xl shadow-xl flex-col"
        style={{ width: '760px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* 헤더 */}
        <div className="flex items-center px-8 py-5 ">
          <button
            onClick={isPending ? undefined : onClose}
            aria-label="뒤로가기"
            className="text-3xl font-bold hover:text-gray-500 transition-colors"
            disabled={isPending}>
            &lt;
          </button>
          <h2 className="ml-4 text-[24px] font-bold flex-grow">리뷰 수정하기</h2>
        </div>

        {/* 제목/모델 */}
        <div className="mx-4 flex items-center px-8 pt-6 pb-4 justify-start gap-3">
          <h3 className="text-[32px] font-bold bold">{title}</h3>
          <ModelButton text="ChatGPT" />
        </div>

        {/* 본문 */}
        <div className="mx-4 px-8 py-6 flex flex-col gap-6">
          <div className="flex justify-start">
            <EditableRating star={updatedRating} onChange={setUpdatedRating} />
          </div>

          {/* 리뷰 textarea */}
          <div className="w-[624px] h-[321px] bg-[#F5F5F5] border border-gray-300 rounded-[8px] p-4 flex flex-col justify-between">
            <textarea
              id="review-text"
              className="w-full h-full bg-transparent resize-none focus:none focus:ring-2 focus:ring-blue-300 transition"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="리뷰 내용을 입력하세요."
              disabled={isPending}
            />

            {/* 등록 버튼 */}
            <div className="flex justify-end mt-4">
              <PrimaryButton
                buttonType="squareMini"
                text={isPending ? '수정 중…' : '등록'}
                onClick={isPending || reviewText.trim().length === 0 ? () => {} : handleSaveClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 오버레이 */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isPending) onClose();
              }}
            />

            {/* 바텀시트 */}
            <motion.div
              className="lg:hidden fixed bottom-[63px] left-0 w-full h-[276px] bg-white rounded-t-[24px] 
                   shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-[20px] pt-0 z-50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.05}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 800) {
                  if (!isPending) onClose();
                }
              }}>
              <div className="flex justify-center pt-[8px] pb-[12px]">
                <img src={Bar} alt="bar" className="w-[40px] h-[4px] rounded-full" />
              </div>

              <div className="flex items-center gap-[4px] mb-[8px] pt-[20px]">
                <EditableRating star={updatedRating} onChange={setUpdatedRating} />
              </div>

              <textarea
                className="w-full h-[120px] bg-[#F5F5F5] rounded-[8px] p-[10px] text-[12px] text-[#333] resize-none focus:outline-none"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="리뷰 내용을 입력하세요."
                disabled={isPending}
              />

              <button
                onClick={handleSaveClick}
                disabled={isPending || reviewText.trim().length === 0}
                className="mt-[16px] w-full h-[40px] bg-[#337EFF] text-white text-[14px] font-medium rounded-[6px]">
                {isPending ? '수정 중…' : '수정하기'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateModal;
