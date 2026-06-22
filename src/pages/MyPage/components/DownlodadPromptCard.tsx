import type { NewDownloadedPromptDTO } from '@/types/MyPage/prompt';
import useDeleteReview from '@/hooks/mutations/PromptDetailPage/useDeleteReview';
import icon from '@/assets/icon-review.svg';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Rating from './Rating';
import logo from '@/assets/logo/app/app-logo-default.svg';
import defaultProfile from '@/assets/icon-profile-image-default.svg';
import defaultlogo from '@/assets/logo/app/app-logo-default.svg';
import DualModal from '@components/Modal/DualModal';
import TextModal from '@components/Modal/TextModal';
import RefundModal from './RefundModal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePostRefund } from '@/hooks/mutations/MyPage/usePostRefund';
import { getRefundEligibility } from '@/apis/MyPage/refund';

interface DownloadedPromptCardProps {
  prompt: NewDownloadedPromptDTO;
}

const DownloadedPromptCard = ({ prompt }: DownloadedPromptCardProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  // 환불 관련 상태
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showRefundSuccessModal, setShowRefundSuccessModal] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);

  const { mutate: deleteReviewMutation } = useDeleteReview();
  const { mutate: postRefund } = usePostRefund();

  const handleDeleteReview = () => {
    deleteReviewMutation(prompt.userReview!.review_id);
  };

  const handleWriteReviewClick = (prompt_id: number) => {
    const promptId = prompt_id;
    const targetUrl = `/prompt/${promptId}?open_review=true`;
    navigate(targetUrl);
  };

  const handleEditReview = () => {
    const targetUrl = `/prompt/${prompt.prompt_id}?edit_review=true`;
    navigate(targetUrl);
  };

  // 마운트 시 환불 가능 여부 조회 (유료 프롬프트만)
  useEffect(() => {
    if (prompt.price === 0 || !prompt.purchase_id) return;

    getRefundEligibility(prompt.purchase_id)
      .then((res) => setIsRefundable(res.eligible))
      .catch(() => setIsRefundable(false));
  }, [prompt.purchase_id, prompt.price]);

  const handleRefund = () => {
    postRefund(prompt.purchase_id, {
      onSuccess: () => {
        setShowRefundModal(false);
        setIsRefundable(false);
        setShowRefundSuccessModal(true);
      },
      onError: () => {
        setShowRefundModal(false);
        alert('환불 처리에 실패했습니다.');
      },
    });
  };

  const imageUrl = prompt.imageUrls && prompt.imageUrls.length > 0 ? prompt.imageUrls[0] : defaultlogo;
  const price = prompt.price === 0 ? '무료' : `${prompt.price}원`;

  return (
    <div className="w-full bg-white rounded-[12px] p-[24px]">
      {' '}
      <div className="w-full bg-white pr-[24px] mb-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-[24px] items-center">
            <img src={imageUrl} alt="프롬프트 이미지" className="w-[80px] h-[80px] rounded-[8px]" />
            <Link to={`/prompt/${prompt.prompt_id}`}>
              <p className="custom-h3 text-black mb-[8px]">{prompt.title}</p>
              <p className="custom-h5 text-black">{price}</p>
            </Link>
          </div>

          {/* 환불 버튼 / 환불 완료 상태 */}
          {prompt.price > 0 && (
            <>
              {prompt.is_refunded ? (
                <span className="shrink-0 ml-[16px] custom-body2 text-gray-400">환불 완료</span>
              ) : isRefundable ? (
                <button
                  className="shrink-0 ml-[16px] flex items-center gap-[4px] custom-body2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowRefundModal(true)}>
                  환불하기 <span className="text-gray-400">›</span>
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
      {prompt.has_review === false ? (
        <div className="ml-[80px]">
          <div className="flex items-center">
            <img src={icon} alt="리뷰 아이콘" className="mr-[8px]" />
            <div className="flex flex-col gap-[4px]">
              <p className="custom-h4 text-black">리뷰 작성하기</p>
              <p className="custom-body2 text-gray-700">프롬프트 제작자와 다른 사용자에게 도움 될 수 있어요.</p>
            </div>
          </div>
          <button
            className="w-full px-[20px] py-[12px] bg-white text-primary rounded-[12px] mt-[12px] border-[0.8px] border-primary custom-button1"
            onClick={() => handleWriteReviewClick(prompt.prompt_id)}>
            리뷰 작성하기
          </button>
        </div>
      ) : (
        //30일 이내에 작성한 리뷰일 경우에만 수정할 수 있도록 바꾸어야 함
        <div className="flex flex-col gap-[8px] px-[28px] ml-[80px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-[3.5px]">
              <img
                src={prompt.userProfileImageUrl ? prompt.userProfileImageUrl : defaultProfile}
                alt="작성자 프로필 이미지"
                className="w-[24px] h-[24px] rounded-[50px]"
              />
              <span className="custom-body3">{prompt.userNickname}</span>
            </div>
            <span className="w-[80px] h-[16px]">
              <Rating star={prompt.userReview?.rating} />
            </span>
          </div>
          <div className="custom-body3">{prompt.userReview?.content}</div>
          <div className="flex gap-[8px] mt-[12px]">
            <button
              className="flex-1 py-[12px] bg-white text-alert rounded-[12px]  border-[0.8px] border-alert custom-button1"
              onClick={() => setShowDeleteModal(true)}>
              삭제하기
            </button>
            <button
              className="flex-1 py-[12px] bg-white text-primary rounded-[12px]  border-[0.8px] border-primary custom-button1"
              onClick={() => handleEditReview()}>
              수정하기
            </button>
          </div>
        </div>
      )}
      {/* 삭제 모달 */}
      {showDeleteModal && (
        <DualModal
          text="리뷰를 삭제하시겠습니까?"
          onClickYes={async () => {
            try {
              deleteReviewMutation(prompt.userReview!.review_id);
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
      {showDeleteSuccessModal && (
        <TextModal text="리뷰가 삭제되었습니다." onClick={() => setShowDeleteSuccessModal(false)} size="sm" />
      )}
      {showExpiredModal && (
        <TextModal text="지금은 리뷰를 삭제할 수 없습니다." onClick={() => setShowExpiredModal(false)} size="sm" />
      )}
      {/* 환불 확인 모달 */}
      {showRefundModal && <RefundModal onClickRefund={handleRefund} onClose={() => setShowRefundModal(false)} />}
      {/* 환불 완료 모달 */}
      {showRefundSuccessModal && (
        <TextModal text="결제가 취소되었습니다." onClick={() => setShowRefundSuccessModal(false)} size="sm" />
      )}
    </div>
  );
};
export default DownloadedPromptCard;
