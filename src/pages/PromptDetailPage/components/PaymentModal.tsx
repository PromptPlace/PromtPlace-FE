import React, { useState } from 'react';
import kakaopaylogo from '@/assets/img-kakao-payment.png';
import tosspaylogo from '@/assets/img-toss-payment.png';
import xButton from '@/assets/icon-x-button.svg';

const PaymentModal = ({
  prompt,
  onClose,
}: {
  prompt: { title: string; price: number };
  onClose: () => void;
  onPaid: () => void;
}) => {
  const [selected, setSelected] = useState<'kakao' | 'toss' | null>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={handleBackdropClick}>
      <div
        className="relative p-10 bg-white rounded-lg flex flex-col items-start gap-8 min-w-[400px]"
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <img src={xButton} onClick={onClose} alt="닫기" />
        </div>
        <div className="w-full text-xl font-bold">{prompt.title}</div>
        <div className="w-full h-px bg-gray-200" />
        <div className="text-xl font-medium">{prompt.price}</div>
        <div className="flex items-center gap-6">
          {/* 카카오페이 버튼 */}
          <div
            className={`px-8 py-6 bg-white rounded-lg border flex flex-col items-center gap-4 cursor-pointer
              ${selected === 'kakao' ? 'outline-1 outline-offset-[-1px] outline-primary' : 'border-gray-200'}
            `}
            onClick={() => setSelected('kakao')}>
            <img className="w-20 h-9" src={kakaopaylogo} alt="카카오페이" />
            <div className="text-center text-xl font-medium">카카오페이</div>
          </div>
          {/* 토스페이 버튼 */}
          <div
            className={`w-40 h-32 px-8 py-6 bg-white rounded-lg border flex flex-col items-center gap-4 cursor-pointer
              ${selected === 'toss' ? 'outline-1 outline-offset-[-1px] outline-primary' : 'border-gray-200'}
            `}
            onClick={() => setSelected('toss')}>
            <img className="w-[85px] h-[26px]" src={tosspaylogo} alt="토스페이" />
            <div className="text-center text-xl font-medium">토스페이</div>
          </div>
        </div>
        <div className="w-full flex flex-col items-end gap-2.5">
          <button className="px-10 py-4 bg-gradient-to-bl from-blue-500 to-blue-400 rounded-[10px] shadow-lg flex items-center gap-3.5">
            <span className="text-white text-2xl font-bold">결제하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
