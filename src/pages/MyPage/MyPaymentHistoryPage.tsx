
import { useState, useEffect } from 'react';
import PaymentHistoryRow from './components/PaymentHistoryRow.tsx';
import iconPerson from '@assets/icon-person-blue.svg';
import { useNavigate } from 'react-router-dom';
import bluearrowIcon from '@assets/icon-arrow-left-blue.svg'

const DUMMY_PAYMENT_HISTORY = [
  {
    prompt_id: 1,
    purchase_at: '2025-07-04T09:30:00.000Z',
    title: '프롬프트 구매',
    amount: 10000,
    paymentMethod: '신용카드',
  },
  {
    prompt_id: 2,
    purchase_at: '2025-07-04T12:30:00.000Z',
    title: '효율적인 경쟁사 분석 프롬프트',
    amount: 20000,
    paymentMethod: '계좌이체',
  },
  {
    prompt_id: 3,
    purchase_at: '2025-07-03T17:45:00.000Z',
    title: '정부지원사업 무조건 선정되는 사업계획서 프롬프트',
    amount: 30000,
    paymentMethod: '신용카드',
  },
  {
    prompt_id: 4,
    purchase_at: '2025-07-02T10:15:00.000Z',
    title: '프롬프트 구매',
    amount: 40000,
    paymentMethod: '계좌이체',
  },
  {
    prompt_id: 5,
    purchase_at: '2025-07-01T08:30:00.000Z',
    title: '프롬프트 구매',
    amount: 50000,
    paymentMethod: '신용카드',
  },
  {
    prompt_id: 6,
    purchase_at: '2025-06-30T14:00:00.000Z',
    title: '프롬프트 구매',
    amount: 60000,
    paymentMethod: '계좌이체',
  },
  {
    prompt_id: 7,
    purchase_at: '2025-06-29T11:20:00.000Z',
    title: '프롬프트 구매',
    amount: 70000,
    paymentMethod: '신용카드',
  },
  
];

const PaymentHistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState(DUMMY_PAYMENT_HISTORY);
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지가 로드될 때 API를 통해 결제 내역 데이터를 불러옴
    // api.getPaymentHistory().then(data => setPaymentHistory(data));
  }, []);

  return (
    <div className="flex justify-center h-screen bg-background ">

      <div className="flex flex-col w-full max-w-[1236px] pt-[92px] h-full">
        <div className="shrink-0">
        <div className="flex items-center gap-[10px] mb-[27px]">
          <img src={iconPerson} alt="person icon" className="w-[32px] h-[32px]" />
          <div className="text-[32px] text-primary-hover font-bold">회원정보</div>
        </div>

        <div className="flex items-center h-[90px] border-b-[1px] border-primary-hover">
        <div className="flex items-center gap-[10px] h-[50px] ">
      <button onClick={() => navigate('/mypage/info')} className="flex items-center justify-center  w-[24px] h-[24px]">
        <img src={bluearrowIcon} alt="뒤로가기" />
      </button>
            <span className="text-[24px] text-primary-hover font-bold">결제 내역</span>
        </div>
        </div>
        </div>
      <div className="overflow-y-auto flex-grow max-h-[580px]">
        {paymentHistory.map(item => (
          <PaymentHistoryRow key={item.prompt_id} transaction={item} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;