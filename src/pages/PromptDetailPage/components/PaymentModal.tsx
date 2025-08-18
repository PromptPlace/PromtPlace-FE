import React, { useState, useEffect } from 'react';
import kakaopaylogo from '@/assets/img-kakao-payment.png';
import tosspaylogo from '@/assets/img-toss-payment.png';
import xButton from '@/assets/icon-x-button.svg';
import type { RequestPaymentDTO } from '@/types/PromptDetailPage/payments';
import { usePostPayment } from '@/hooks/mutations/PromptDetailPage/usePostPayment';
import { useAuth } from '@/context/AuthContext';

// 포트원 v1 타입 정의
declare global {
  interface Window {
    IMP: {
      init: (impCode: string) => void;
      request_pay: (paymentData: any, callback: (response: any) => void) => void;
    };
  }
}

const PaymentModal = ({
  promptId,
  title,
  price,
  onClose,
  onPaid: _onPaid,
}: {
  promptId: number;
  title: string;
  price: number;
  onClose: () => void;
  onPaid: () => void; // 결제 여부 관리
}) => {
  const [selected, setSelected] = useState<'kakaopay' | 'tosspay' | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const { mutate: requestPayment } = usePostPayment();

  // 포트원 초기화
  useEffect(() => {
    if (window.IMP) {
      window.IMP.init(import.meta.env.VITE_PORTONE_IMP_CODE || 'imp31482176'); // 가맹점 식별코드
    }
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // 모달창 바깥 클릭 시 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const paymentHandler = () => {
    if (!selected || !window.IMP) return;
    setLoading(true);

    // 고유한 주문번호 생성
    const merchantUid = `prompt_${promptId}_${Date.now()}`;

    // PG사별 설정
    const pgProvider = selected === 'kakaopay' ? 'kakaopay' : 'tosspay';

    const paymentData = {
      pg: pgProvider, // 'kakaopay' 또는 'tosspay'
      pay_method: 'card', // 카드결제
      merchant_uid: merchantUid,
      name: `${title} 구매`,
      amount: price,
      buyer_email: user.email || '',
      buyer_name: user.nickname,
      buyer_tel: phoneNumber || '010-0000-0000',
      buyer_addr: '',
      buyer_postcode: '',
    };

    window.IMP.request_pay(paymentData, (response: any) => {
      setLoading(false);

      if (response.success) {
        // 결제 성공 시 백엔드에 검증 요청
        const backendPaymentData: RequestPaymentDTO = {
          prompt_id: promptId,
          pg: selected as string,
          merchant_uid: merchantUid,
          amount: price,
          buyer_name: user.nickname,
          redirect_url: `${window.location.origin}/prompt/${promptId}`,
          imp_uid: response.imp_uid, // 포트원 거래 고유번호
        };

        requestPayment(backendPaymentData, {
          onSuccess: (res) => {
            console.log('결제 완료 처리 성공:', res);
            alert('결제가 완료되었습니다!');
            _onPaid(); // 결제 완료 콜백 호출
            onClose(); // 모달 닫기
          },
          onError: (err: unknown) => {
            console.error('결제 완료 처리 실패:', err);
            alert('결제는 완료되었지만 처리 중 오류가 발생했습니다. 고객센터에 문의해주세요.');
            onClose(); // 에러 발생 시에도 모달 닫기
          },
        });
      } else {
        // 결제 실패
        alert(`결제 실패: ${response.error_msg}`);
        onClose(); // 결제 실패 시에도 모달 닫기
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={handleBackdropClick}>
      {/* PC 뷰 (lg 이상) */}
      <div
        className="hidden lg:block relative p-10 bg-white rounded-lg min-w-[400px]"
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <img src={xButton} onClick={onClose} alt="닫기" />
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="w-full text-xl font-bold">{title}</div>
          <div className="w-full h-px bg-gray-200" />
          <div className="text-xl font-medium">{price.toLocaleString()}원</div>
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
          <div className="w-full">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="010-0000-0000"
              className="w-full border border-gray-300 rounded-md p-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-end gap-2.5">
            <button
              className={`px-10 py-4 rounded-[10px] shadow-lg flex items-center gap-3.5 ${
                selected ? `bg-gradient-to-bl from-blue-500 to-blue-400 text-white` : `bg-gray-200 text-gray-500`
              }`}
              disabled={!selected || loading}
              onClick={paymentHandler}>
              <span className="text-2xl font-bold">{loading ? '처리중...' : '결제하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 뷰 (lg 미만) */}
      <div
        className="lg:hidden w-72 p-5 bg-white rounded-lg inline-flex flex-col justify-start items-start gap-3"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-4 h-4 relative overflow-hidden cursor-pointer" onClick={onClose}>
          <div className="w-2.5 h-2.5 left-[2.60px] top-[2.60px] absolute bg-text-on-white border-text-on-white"></div>
        </div>
        <div className="self-stretch justify-start text-text-on-white text-base font-bold font-['Spoqa_Han_Sans_Neo']">
          {title}
        </div>
        <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-white-stroke"></div>
        <div className="justify-start text-text-on-white text-base font-medium font-['Spoqa_Han_Sans_Neo']">
          {price.toLocaleString()} 원
        </div>
        <div className="self-stretch py-3 flex flex-col justify-center items-center gap-5">
          {/* 카카오페이 버튼 */}
          <div
            className={`w-52 h-9 px-4 py-2 bg-white rounded-[50px] shadow-[0px_0.5988024473190308px_1.7964073419570923px_0px_rgba(0,0,0,0.08)] outline outline-[0.50px] outline-offset-[-0.50px] ${
              selected === 'kakaopay' ? 'outline-primary' : 'outline-white-stroke'
            } inline-flex justify-start items-center gap-2 cursor-pointer`}
            onClick={() => setSelected('kakaopay')}>
            <img className="w-8 h-3" src={kakaopaylogo} alt="카카오페이" />
            <div className="w-36 text-center justify-start text-text-on-white text-xs font-medium font-['Spoqa_Han_Sans_Neo']">
              카카오페이로 결제하기
            </div>
          </div>
          {/* 토스페이 버튼 */}
          <div
            className={`w-52 h-9 px-4 py-2 bg-white rounded-[50px] shadow-[0px_0.5988024473190308px_1.7964073419570923px_0px_rgba(0,0,0,0.08)] outline outline-[0.50px] outline-offset-[-0.50px] ${
              selected === 'tosspay' ? 'outline-primary' : 'outline-white-stroke'
            } inline-flex justify-start items-center gap-2 cursor-pointer`}
            onClick={() => setSelected('tosspay')}>
            <img className="w-8 h-2.5" src={tosspaylogo} alt="토스페이" />
            <div className="w-36 text-center justify-start text-text-on-white text-xs font-medium font-['Spoqa_Han_Sans_Neo']">
              토스페이로 결제하기
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-center items-end gap-2.5">
          <button
            className={`px-5 py-2 rounded shadow-[2px_2px_30px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-3.5 ${
              selected ? 'bg-gradient-to-bl from-blue-500 to-blue-400' : 'bg-gray-300'
            }`}
            disabled={!selected || loading}
            onClick={paymentHandler}>
            <div className="justify-start text-white text-sm font-bold font-['Spoqa_Han_Sans_Neo']">
              {loading ? '처리중...' : '결제하기'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
