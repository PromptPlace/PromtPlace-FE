import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SellerCardData } from '@pages/AdminPage/utils/sellerMapper.ts';
import rightArrow from '../../assets/icon-arrow-right-blue.svg';
import SellerCancelModal from '@pages/AdminPage/components/AdminDashboardComponents/SellerCancelModal.tsx';
import SellerDeclineModal from '@pages/AdminPage/components/AdminDashboardComponents/SellerDeclineModal.tsx';
import useApprovePendingSeller from '@hooks/mutations/AdminPage/useApprovePendingSeller.ts';
import useRejectPendingSeller from '@hooks/mutations/AdminPage/useRejectPendingSeller.ts';
import useCancelSellerRegistration from '@hooks/mutations/AdminPage/useCancelSellerRegistration.ts';
import { useOpenChatRoom } from '@/hooks/useOpenChatRoom';

interface SellerCardProps {
  seller: SellerCardData;
  showFormLink?: boolean;
}

const SellerCard = ({ seller, showFormLink = true }: SellerCardProps) => {
  const navigate = useNavigate();
  const { openChatRoom } = useOpenChatRoom();

  const sellerFormPath = seller.isWaiting
    ? `/admin/dashboard/sellers/pending/${seller.userId}`
    : seller.isBusiness
      ? `/admin/dashboard/sellers/business/${seller.userId}`
      : `/admin/dashboard/sellers/individual/${seller.userId}`;

  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  const { mutate: approvePendingSeller, isPending: isApproving } = useApprovePendingSeller();
  const { mutate: rejectPendingSeller, isPending: isRejecting } = useRejectPendingSeller();
  const { mutate: cancelSellerRegistration, isPending: isCancelling } = useCancelSellerRegistration();

  return (
    <div className="px-11 py-4">
      <div className="flex">
        <img
          className="w-10 h-10 relative left-0 top-0 bg-gray-400 rounded-full"
          src={seller.hasImage ? seller.image : undefined}
          alt=""
        />
        <div className="flex w-full justify-between">
          <div className="px-4 pb-4 gap-2 flex flex-col">
            <div className="">{seller.nickname}</div>
            <div className="flex gap-5">
              <div className="flex gap-2 justify-center items-center">
                <span className="text-gray-700 text-xs">실명</span>
                <span className="text-gray-700 tracking-tight font-light text-sm">{seller.name}</span>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <span className="text-gray-700 text-xs">이메일</span>
                <span className="text-gray-700 tracking-tight font-light text-sm">{seller.email}</span>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <span className="text-gray-700 text-xs">정산계좌</span>
                <span className="text-gray-700 tracking-tight font-light text-sm">
                  {seller.bank && seller.account ? (
                    <>
                      <span>{seller.bank}, </span>
                      <span>{seller.account}</span>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </span>
              </div>
            </div>
          </div>
          {showFormLink && (
            <div
              className="flex gap-1 w-[126px] h-[68px] items-center justify-center cursor-pointer"
              onClick={() => navigate(sellerFormPath)}>
              <div className=" text-primary text-sm">등록폼 보기</div>
              <img className="w-6 h-6" src={rightArrow} alt="오른쪽 화살표 아이콘" />
            </div>
          )}
        </div>
      </div>
      {/*사업자 등록증 링크는 API가 URL을 제공하는 승인 대기 카드에서만 노출됩니다. 승인 완료 목록 API에는 해당 필드가 없습니다.*/}
      {seller.businessLicenseUrl && (
        <a href={seller.businessLicenseUrl} target="_blank" rel="noreferrer" className="underline">
          사업자 등록증
        </a>
      )}
      {seller.isWaiting ? (
        <div className="mt-2 flex gap-5 w-full">
          <div
            className="w-full h-12 px-5 py-3 bg-white rounded-xl outline-[0.88px] outline-primary cursor-pointer"
            onClick={() => openChatRoom(seller.userId)}>
            <div className="flex justify-center items-center text-primary text-sm">메시지</div>
          </div>
          <div className="w-full h-12 px-5 py-3 bg-white rounded-xl outline-[0.88px] outline-gray-400">
            <div
              className="flex items-center justify-center text-gray-700 cursor-pointer"
              onClick={() => {
                setIsDeclineModalOpen(true);
              }}>
              반려
            </div>
          </div>
          <div
            className="w-full h-12 px-5 py-3 bg-primary rounded-xl cursor-pointer"
            onClick={() => approvePendingSeller(seller.userId)}>
            <div className="flex items-center justify-center text-white">{isApproving ? '승인 중...' : '승인'}</div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex gap-5 w-full">
          <div
            className="w-full h-12 px-5 py-3 bg-white rounded-xl outline-[0.88px] outline-primary cursor-pointer"
            onClick={() => openChatRoom(seller.userId)}>
            <div className="flex justify-center items-center text-primary text-sm">메시지</div>
          </div>
          <div className="w-full h-12 px-5 py-3 bg-white rounded-xl outline-[0.88px] outline-gray-400">
            <div
              className="flex justify-center items-center text-gray-700 text-sm cursor-pointer"
              onClick={() => {
                setIsCancelledModalOpen(true);
              }}>
              등록 취소
            </div>
          </div>
        </div>
      )}
      {isCancelledModalOpen && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center z-[9999]"
          onClick={() => setIsCancelledModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <SellerCancelModal
              sellerName={seller.name}
              isSubmitting={isCancelling}
              onClose={() => setIsCancelledModalOpen(false)}
              onConfirm={() =>
                cancelSellerRegistration(seller.userId, {
                  onSuccess: () => setIsCancelledModalOpen(false),
                })
              }
            />
          </div>
        </div>
      )}

      {isDeclineModalOpen && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center z-[9999]"
          onClick={() => setIsDeclineModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <SellerDeclineModal
              sellerName={seller.name}
              isSubmitting={isRejecting}
              onClose={() => setIsDeclineModalOpen(false)}
              onConfirm={() =>
                rejectPendingSeller(seller.userId, {
                  onSuccess: () => setIsDeclineModalOpen(false),
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCard;
