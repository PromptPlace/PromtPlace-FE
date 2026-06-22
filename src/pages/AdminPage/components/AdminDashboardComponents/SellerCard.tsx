import React, { useState } from 'react';
import type { sellerProps } from '@/types/AdminPage/dashboard.ts';
import rightArrow from '../../assets/icon-arrow-right-blue.svg';
import AdminModal from '@components/Modal/AdminModal.tsx';
import SellerCancelModal from '@pages/AdminPage/components/AdminDashboardComponents/SellerCancelModal.tsx';
import SellerDeclineModal from '@pages/AdminPage/components/AdminDashboardComponents/SellerDeclineModal.tsx';

const SellerCard = ({ seller }: { seller: sellerProps }) => {
  const [isSelected, setIsSelected] = useState();
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  return (
    <div className="px-11 py-4">
      <div className="flex">
        <img className="w-10 h-10 relative left-0 top-0 bg-gray-400 rounded-full" />
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
                  <span>{seller.bank}, </span>
                  <span>{seller.account}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-1 w-[126px] h-[68px] items-center justify-center">
            <div className=" text-primary text-sm">등록품 보기</div>
            <img className="w-6 h-6" src={rightArrow} alt="오른쪽 화살표 아이콘" />
          </div>
        </div>
      </div>
      {/*사업자 등록증은 사업자 판매자일때만*/}
      {seller.isBusiness && <div>사업자 등록증</div>}
      {seller.isWaiting ? (
        <div className="mt-2 flex gap-5 w-full">
          <div className="w-full h-12 px-5 py-3 bg-white rounded-xl outline-[0.88px] outline-primary">
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
          <div className="w-full h-12 px-5 py-3 bg-primary rounded-xl">
            <div className="flex items-center justify-center text-white">승인</div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex gap-5 w-full">
          <div className="w-full h-12 px-5 py-3 bg-white rounded-xl outline-[0.88px] outline-primary">
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
            <SellerCancelModal onClose={() => setIsCancelledModalOpen(false)} />
          </div>
        </div>
      )}

      {isDeclineModalOpen && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center z-[9999]"
          onClick={() => setIsDeclineModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <SellerDeclineModal onClose={() => setIsDeclineModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCard;
