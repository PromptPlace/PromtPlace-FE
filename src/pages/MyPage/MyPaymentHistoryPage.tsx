import { useState, useEffect } from 'react';
import PaymentHistoryRow from './components/PaymentHistoryRow.tsx';
import iconPerson from '@assets/icon-person-blue.svg';
import { useNavigate } from 'react-router-dom';
import bluearrowIcon from '@assets/icon-arrow-left-blue.svg'; //추후 디자인 규격에 맞게 수정 필요
import { useGetPurchaseHistory } from '@/hooks/queries/MyPage/useGetPay.ts';
import type { Purchase } from '@/types/MyPage/pay.ts';
import blackarrowIcon from '@/assets/keyboard_arrow_down.svg';

const DUMMY_PAYMENT_HISTORY: Purchase[] = [
  {
    prompt_id: 1,
    purchased_at: '2025-07-04T09:30:00.000Z',
    title: '프롬프트 구매',
    price: 10000,
    pg: 'tosspay',
  },
  {
    prompt_id: 4,
    purchased_at: '2025-07-02T10:15:00.000Z',
    title: '프롬프트 구매',
    price: 40000,
    pg: 'kakaopay',
  },
  {
    prompt_id: 5,
    purchased_at: '2025-07-01T08:30:00.000Z',
    title: '프롬프트 구매',
    price: 50000,
    pg: 'tosspay',
  },
  {
    prompt_id: 6,
    purchased_at: '2025-06-30T14:00:00.000Z',
    title: '프롬프트 구매',
    price: 60000,
    pg: 'tosspay',
  },
  {
    prompt_id: 7,
    purchased_at: '2025-06-29T11:20:00.000Z',
    title: '프롬프트 구매',
    price: 70000,
    pg: 'tosspay',
  },
];

const PaymentHistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState(DUMMY_PAYMENT_HISTORY);
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지가 로드될 때 API를 통해 결제 내역 데이터를 불러옴
    // api.getPaymentHistory().then(data => setPaymentHistory(data));
  }, []);

  const { data: purchasesResponse } = useGetPurchaseHistory();

  return (
    <div className="flex justify-center h-screen bg-background ">
      <div className="flex flex-col w-full max-w-[1236px] max-lg:px-[20px] pt-[92px] max-lg:pt-[12px] h-full">
        <div className="shrink-0">
          <div className="flex items-center gap-[10px] mb-[27px] max-lg:mb-[20px] max-lg:hidden">
            <img src={iconPerson} alt="person icon" className="w-[32px] max-lg:w-[20px] h-[32px] max-lg:h-[20px]" />
            <div className="text-[32px] max-lg:text-[20px] text-primary-hover font-bold">회원정보</div>
          </div>

          <div className="lg:hidden relative flex items-center  h-[90px] max-lg:h-auto border-b-[1px] max-lg:border-b-[0px] border-primary-hover">
            <div className="flex justify-center  gap-[10px] h-[50px] max-lg:h-auto max-lg:w-full">
              <button
                onClick={() => navigate(-1)}
                className="absolute left-0 flex  justify-center   w-[24px] max-lg:w-[20px] h-[24px] max-lg:h-[20px] max-lg:mr-[66px]">
                <img src={blackarrowIcon} alt="뒤로가기" className="lg:hidden " />
              </button>
              <span className="text-[24px] max-lg:text-[16px] text-primary-hover max-lg:text-[#2A2A2A] font-bold max-lg:font-medium">
                결제 내역
              </span>
            </div>
          </div>

          <div className="max-lg:hidden flex items-center h-[90px] border-b-[1px] border-primary-hover">
            <div className="flex items-center gap-[10px] h-[50px] ">
              <button
                onClick={() => navigate('/mypage/info')}
                className="flex items-center justify-center  w-[24px] h-[24px]">
                <img src={bluearrowIcon} alt="뒤로가기" />
              </button>
              <span className="text-[24px] text-primary-hover font-bold">결제 내역</span>
            </div>
          </div>
        </div>

        {(purchasesResponse?.purchases?.length ?? 0 > 0) ? (
          <div className="flex-grow min-h-0 p-[8px] max-lg:p-[0px] bg-white">
            <div className="overflow-y-auto h-full">
              {/* api 적용할때 purchasesResponse.purchases로 변경 */}
              {purchasesResponse?.purchases.map((item) => (
                <PaymentHistoryRow key={item.prompt_id} transaction={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex lg:mt-[96px] max-lg:mt-[176px] justify-center text-text-on-background text-[24px] max-lg:text-[12px] font-medium">
            결제 내역이 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
