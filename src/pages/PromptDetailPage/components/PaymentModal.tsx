import React, { useState, useEffect } from 'react';
import kakaopaylogo from '@/assets/img-kakao-payment.png';
import tosspaylogo from '@/assets/img-toss-payment.png';
import xButton from '@/assets/icon-x-button.svg';
import type { RequestPaymentDTO } from '@/types/PromptDetailPage/payments';
import { usePostPayment, usePostPaymentCheck } from '@/hooks/mutations/PromptDetailPage/usePostPayment';
import { useAuth } from '@/context/AuthContext';

// 포트원 결제 요청 데이터 타입
interface PortOnePaymentData {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
  m_redirect_url: string;
  custom_data: {
    promptId: number;
  };
}

// 포트원 결제 응답 타입
interface PortOneResponse {
  success: boolean;
  imp_uid?: string;
  merchant_uid?: string;
  error_msg?: string;
  paid_amount?: number;
  pay_method?: string;
}

// 포트원 v1 타입 정의
declare global {
  interface Window {
    IMP: {
      init: (impCode: string) => void;
      request_pay: (paymentData: PortOnePaymentData, callback: (response: PortOneResponse) => void) => void;
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
  const { mutate: requestPaymentCheck } = usePostPaymentCheck();

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

    // 백엔드 결제 요청 데이터
    const paymentRequestData = {
      prompt_id: promptId,
      pg: selected, // 'kakaopay' | 'tosspay'
      merchant_uid: 'store-ac1c069c-7294-44cc-a81b-1ec7558c55d2', // 명세서에 정의된 고정값
      amount: price,
      buyer_name:  '구매자', //기존: buyer_name: user.nickname || '구매자' User타입에서 nickname 제거로 고정값 처리
      redirect_url: `${window.location.origin}/payment/result`,
      custom_data: {
        promptId: { promptId: promptId },
      },
    };

    // 1단계: 백엔드에 결제 요청
    requestPayment(paymentRequestData, {
      onSuccess: (response) => {
        console.log('백엔드 결제 요청 성공:', response);
        
        // 2단계: 포트원 결제 실행
        const paymentData = {
          pg: selected, // 'kakaopay' 또는 'tosspay'
          pay_method: 'card',
          merchant_uid: response.merchant_uid || paymentRequestData.merchant_uid,
          name: `${title} 구매`,
          amount: price,
          buyer_email: user.email || '',
          buyer_name: '구매자',  //기존: buyer_name: user.nickname || '구매자'
          buyer_tel: phoneNumber || '010-0000-0000',
          buyer_addr: '',
          buyer_postcode: '',
          m_redirect_url: response.redirect_url || paymentRequestData.redirect_url,
          custom_data: {
            promptId: promptId,
          },
        };

        window.IMP.request_pay(paymentData, (portoneResponse: PortOneResponse) => {
          if (portoneResponse.success && portoneResponse.imp_uid && portoneResponse.merchant_uid) {
            // 3단계: 결제 완료 후 백엔드 검증
            const verificationData = {
              imp_uid: portoneResponse.imp_uid,
              merchant_uid: portoneResponse.merchant_uid,
            };

            requestPaymentCheck(verificationData, {
              onSuccess: (verifyResponse) => {
                console.log('결제 검증 완료:', verifyResponse);
                setLoading(false);
                alert('결제가 완료되었습니다!');
                _onPaid(); // 결제 완료 콜백 호출
                onClose(); // 모달 닫기
              },
              onError: (verifyError: unknown) => {
                console.error('결제 검증 실패:', verifyError);
                setLoading(false);
                alert('결제는 완료되었지만 검증 중 오류가 발생했습니다. 고객센터에 문의해주세요.');
                onClose();
              },
            });
          } else {
            // 결제 실패
            setLoading(false);
            alert(`결제 실패: ${portoneResponse.error_msg || '알 수 없는 오류가 발생했습니다.'}`);
            onClose();
          }
        });
      },
      onError: (error: unknown) => {
        console.error('백엔드 결제 요청 실패:', error);
        setLoading(false);
        alert('결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      },
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
        <div className="self-stretch h-0 outline-[0.50px] outline-offset-[-0.25px] outline-white-stroke"></div>
        <div className="justify-start text-text-on-white text-base font-medium font-['Spoqa_Han_Sans_Neo']">
          {price.toLocaleString()} 원
        </div>
        <div className="self-stretch py-3 flex flex-col justify-center items-center gap-5">
          {/* 카카오페이 버튼 */}
          <div
            className={`w-52 h-9 px-4 py-2 bg-white rounded-[50px] shadow-[0px_0.5988024473190308px_1.7964073419570923px_0px_rgba(0,0,0,0.08)] outline-[0.50px] outline-offset-[-0.50px] ${
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
            className={`w-52 h-9 px-4 py-2 bg-white rounded-[50px] shadow-[0px_0.5988024473190308px_1.7964073419570923px_0px_rgba(0,0,0,0.08)] outline-[0.50px] outline-offset-[-0.50px] ${
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
