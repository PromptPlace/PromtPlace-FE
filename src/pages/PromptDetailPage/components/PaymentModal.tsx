import React, { useState } from 'react';
import kakaopaylogo from '@/assets/img-kakao-payment.png';
import tosspaylogo from '@/assets/img-toss-payment.png';
import xButton from '@/assets/icon-x-button.svg';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({
  prompt,
  onClose,
  onPaid,
}: {
  prompt: { title: string; price: number }; //id: number 추가 필요
  onClose: () => void;
  onPaid: () => void; // 결제 여부 관리
}) => {
  const [selected, setSelected] = useState<'kakao' | 'toss' | null>(null);
  // const navigate = useNavigate();
  const handleBackdropClick = (e: React.MouseEvent) => {
    // 모달창 바깥 클릭 시 닫기
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
        <div className="lg:w-full lg:text-xl sm:w-full font-bold">{prompt.title}</div>
        <div className="w-full h-px bg-gray-200" />
        <div className="text-xl font-medium">{prompt.price}원</div>
        <div className="flex items-center gap-6">
          {/* 카카오페이 버튼 */}
          <div
            className={`px-8 py-6 bg-white rounded-lg border-[1px] flex flex-col items-center gap-4 cursor-pointer
              ${selected === 'kakao' ? 'outline-1 outline-offset-[-1px] outline-primary' : 'border-gray-200'}
            `}
            onClick={() => setSelected('kakao')}>
            <img className="w-20 h-9" src={kakaopaylogo} alt="카카오페이" />
            <div className="text-center text-xl font-medium">카카오페이</div>
          </div>
          {/* 토스페이 버튼 */}
          <div
            className={`w-40 h-32 px-8 py-6 bg-white rounded-lg border-[1px] flex flex-col items-center gap-4 cursor-pointer
              ${selected === 'toss' ? 'outline-1 outline-offset-[-1px] outline-primary' : 'border-gray-200'}
            `}
            onClick={() => setSelected('toss')}>
            <img className="w-[85px] h-[26px]" src={tosspaylogo} alt="토스페이" />
            <div className="text-center text-xl font-medium">토스페이</div>
          </div>
        </div>
        <div className="w-full flex flex-col items-end gap-2.5">
          <button
            className={`px-10 py-4 rounded-[10px] shadow-lg flex items-center gap-3.5 ${selected === 'toss' || selected === 'kakao' ? `bg-gradient-to-bl from-blue-500 to-blue-400` : `bg-white outline-gray-400 text-gray-500`}`}
            onClick={() => {
              if (selected != null) {
                onClose();
                onPaid();
              }
            }}>
            {/* onClick={() => navigate(`/prompt/${prompt.id}`)} */}
            {/* 결제 완료 시 프롬프트 상세 페이지로 이동. 결제 API 연동 후 수정 */}
            <span
              className={`text-2xl font-bold ${selected === 'toss' || selected === 'kakao' ? 'text-white' : 'text-gray-500'}`}>
              결제하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
