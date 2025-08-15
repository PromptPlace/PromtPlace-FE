import React, { useState } from 'react';
import kakaopaylogo from '@/assets/img-kakao-payment.png';
import tosspaylogo from '@/assets/img-toss-payment.png';
import xButton from '@/assets/icon-x-button.svg';
import { useNavigate } from 'react-router-dom';
import type { RequestPaymentDTO } from '@/types/PromptDetailPage/payments';
import type { PromptDetailDto } from '@/types/PromptDetailPage/PromptDetailDto';
import { usePostPayment } from '@/hooks/mutations/PromptDetailPage/usePostPayment';

const PaymentModal = ({
  prompt,
  user,
  onClose,
  onPaid,
}: {
  prompt: PromptDetailDto;
  user: { user_id: number; nickname: string; profile_img_url?: string; email?: string; tel?: string };
  onClose: () => void;
  onPaid: () => void; // 결제 여부 관리
}) => {
  const [selected, setSelected] = useState<'kakaopay' | 'tosspay' | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate: requestPayment } = usePostPayment();

  const handleBackdropClick = (e: React.MouseEvent) => {
    // 모달창 바깥 클릭 시 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const paymentHandler = () => {
    if (!selected) return;
    setLoading(true);

    const paymentData: RequestPaymentDTO = {
      prompt_id: prompt.prompt_id,
      pg: selected,
      merchant_uid: "store-ac1c069c-7294-44cc-a81b-1ec7558c55d2",
      amount: prompt.price,
      buyer_name: user.nickname,
      redirect_url: `${window.location.origin}/prompt/${prompt.prompt_id}/`,
    };

    requestPayment(paymentData, {
      onSuccess: (res) => {
        setLoading(false);
        if (res.redirect_url) {
          window.location.href = res.redirect_url;
        } else {
          alert('결제 요청에 실패했습니다.');
        }
      },
      onError: (err: any) => {
        setLoading(false);
        alert(err.message || '결제 요청 중 오류가 발생했습니다.');
      },
    });
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
        <div className="text-xl font-medium">{prompt.price.toLocaleString()}원</div>
        <div className="flex items-center gap-6">
          {/* 카카오페이 버튼 */}
          <div
            className={`px-8 py-6 bg-white rounded-lg border-[1px] flex flex-col items-center gap-4 cursor-pointer
              ${selected === 'kakaopay' ? 'outline-1 outline-offset-[-1px] outline-primary' : 'border-gray-200'}
            `}
            onClick={() => setSelected('kakaopay')}>
            <img className="w-20 h-9" src={kakaopaylogo} alt="카카오페이" />
            <div className="text-center text-xl font-medium">카카오페이</div>
          </div>
          {/* 토스페이 버튼 */}
          <div
            className={`w-40 h-32 px-8 py-6 bg-white rounded-lg border-[1px] flex flex-col items-center gap-4 cursor-pointer
              ${selected === 'tosspay' ? 'outline-1 outline-offset-[-1px] outline-primary' : 'border-gray-200'}
            `}
            onClick={() => setSelected('tosspay')}>
            <img className="w-[85px] h-[26px]" src={tosspaylogo} alt="토스페이" />
            <div className="text-center text-xl font-medium">토스페이</div>
          </div>
        </div>
        <div className="w-full flex flex-col items-end gap-2.5">
          <button
            className={`px-10 py-4 rounded-[10px] shadow-lg flex items-center gap-3.5 ${selected ? `bg-gradient-to-bl from-blue-500 to-blue-400` : `bg-white-stroke`}`}
            disabled={!selected || loading}
            onClick={paymentHandler}>
            <span className="text-2xl font-bold">결제하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
