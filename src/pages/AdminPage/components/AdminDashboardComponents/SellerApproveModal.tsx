import React from 'react';

interface SellerApproveModalProps {
  sellerName: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SellerApproveModal = ({ sellerName, isSubmitting, onClose, onConfirm }: SellerApproveModalProps) => {
  return (
    <div className="rounded-2xl px-8 py-10 w-[940px] h-[213px] bg-white">
      <div className="flex text-center justify-center text-2xl">
        {sellerName}님의 판매자 등록 신청을 승인하겠습니까?
      </div>
      <div className="flex mt-3 font-light tracking-tight items-center justify-center">
        판매자 등록 신청 승인 시, 해당 사용자는 판매자로 등록됩니다.
      </div>
      <div className="mt-5 gap-3 flex">
        <div
          className="flex w-[432px] h-[57px] px-5 py-4 text-lg text-primary rounded-xl outline outline-primary items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={onClose}>
          뒤로 가기
        </div>
        <div
          className={`w-[432px] h-[57px] bg-primary text-white items-center justify-center rounded-xl flex ${
            isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-opacity-90'
          }`}
          onClick={isSubmitting ? undefined : onConfirm}>
          {isSubmitting ? '처리 중...' : '승인'}
        </div>
      </div>
    </div>
  );
};

export default SellerApproveModal;
