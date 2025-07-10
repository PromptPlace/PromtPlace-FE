import { useState, useEffect } from 'react';
import ModelButton from '@components/Button/ModelButton';
import Rating from '@components/Rating';
import PrimaryButton from '@components/Button/PrimaryButton';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  views?: number;
  downloads?: number;
  rating: number;
  initialReviewText: string;
  onSave: (rating: number, reviewText: string) => void;
}

const UpdateModal = ({ isOpen, onClose, title, rating, initialReviewText, onSave }: UpdateModalProps) => {
  const [reviewText, setReviewText] = useState(initialReviewText);

  useEffect(() => {
    setReviewText(initialReviewText);
  }, [initialReviewText]);

  if (!isOpen) return null;

  const handleSaveClick = () => {
    onSave(rating, reviewText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 p-4">
      <div
        className="relative bg-white rounded-2xl shadow-xl flex flex-col"
        style={{ width: '760px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* 헤더 */}
        <div className="flex items-center px-8 py-5 ">
          <button
            onClick={onClose}
            aria-label="뒤로가기"
            className="text-3xl font-bold hover:text-gray-500 transition-colors">
            &lt;
          </button>
          <h2 className="ml-4 text-[24px] font-bold flex-grow">리뷰 수정하기</h2>
        </div>

        {/* 제목 및 카운트 */}
        <div className="mx-4 flex items-center px-8 pt-6 pb-4 justify-start gap-3">
          <h3 className="text-[32px] font-bold bold">{title}</h3>
          <ModelButton text="ChatGPT" />
        </div>

        {/* 본문 */}
        <div className="mx-4 px-8 py-6 flex flex-col gap-6">
          <div className="flex justify-start">
            <Rating star={rating} />
          </div>

          {/* 리뷰 textarea */}
          <div className="w-[624px] h-[321px] bg-[#F5F5F5] border border-gray-300 rounded-[8px] p-4 flex flex-col justify-between">
            <textarea
              id="review-text"
              className="w-full h-full bg-transparent resize-none focus:outline-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="리뷰 내용을 입력하세요."
            />

            {/* 등록 버튼 */}
            <div className="flex justify-end mt-4">
              <PrimaryButton buttonType="squareMini" text="등록" onClick={handleSaveClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
