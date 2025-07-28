import { useState } from 'react';
import PossiblepayAmount from './components/PossiblepayAmount';
import SalesHistoryCard from './components/SalesHistoryCard';
import iconReceipt from '@assets/icon-receipt-primary.svg';
import TextModal from '@/components/Modal/TextModal';

// 더미 데이터 예시
const DUMMY_USER_INFO = {
  nickname: '주토피아노',
  balance: 2100,
};

const DUMMY_SALES_HISTORY = [
  {
    id: 1,
    date: '2025.06.13',
    title: '정부지원사업 무조건 선정되는 사업계획서 프롬프트 정부지원사업 정부지원사업',
    price: 2500,
    buyer: '홍길동',
  },
  { id: 2, date: '2025.06.12', title: '효율적인 경쟁사 분석 프롬프트', price: 2000, buyer: '율랄라' },
  { id: 3, date: '2025.06.11', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 4, date: '2025.06.10', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 5, date: '2025.06.09', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 6, date: '2025.06.08', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 7, date: '2025.06.07', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 8, date: '2025.06.06', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 9, date: '2025.06.05', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
  { id: 10, date: '2025.06.04', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },
];

const MyPayPage = () => {
  const [userInfo, setUserInfo] = useState(DUMMY_USER_INFO);
  const [salesHistory, setSalesHistory] = useState(DUMMY_SALES_HISTORY);
  const [showModal, setShowModal] = useState(false);

  const handleWithdraw = () => {
    console.log('출금하기 모달을 엽니다.');
    setShowModal(true);
  };

  return (
    <div className="flex justify-center h-screen bg-background ">
      <div className="flex flex-col pt-[92px] w-full max-w-[1236px] h-full max-lg:pt-[12px]">
        <div className="shrink-0 max-lg:mx-[20px]">
          <div className="flex items-center gap-[4px] mb-[23px] py-[10px] max-lg:gap-[2.5px] max-lg:mb-[20px] max-lg:py-[0px]">
            <img
              src={iconReceipt}
              alt="receipt"
              className="w-[32px] h-[32px] flex items-center justify-center max-lg:w-[20px] h-[20px]"
            />
            <div className=" text-[32px] text-primary-hover font-bold max-lg:text-[20px]">정산관리</div>
          </div>
          <div className="lg:hidden text-[14px] font-medium text-primary-hover mb-[12px]">
            {userInfo.nickname}님의 출금 가능 금액
          </div>
          <PossiblepayAmount nickname={userInfo.nickname} balance={userInfo.balance} onWithdraw={handleWithdraw} />

          <div className="text-[24px] text-primary-hover font-bold pl-[40px] py-[20px] border-b-[1px] border-primary-hover max-lg:text-[14px] max-lg:text-primary max-lg:pl-[12px] max-lg:py-[12px] max-lg:border-b-[0.5px] max-lg:border-primary">
            <span className="max-lg:hidden">판매 내역</span>
            <span className="hidden max-lg:inline">판매내역</span>
          </div>
        </div>

        <div className="max-lg:hidden bg-white flex-1 min-h-0">
          <div className="mr-[8px] overflow-y-auto max-h-[564px] max-lg:max-h-[273px] max-lg:mr-[0px]">
            {salesHistory.map((sale) => (
              <SalesHistoryCard key={sale.id} sale={sale} />
            ))}
          </div>
        </div>

        <div className="lg:hidden flex-1 min-h-0 overflow-y-auto max-h-[312px] ml-[20px] mr-[12px] ">
          <div className="bg-white  mr-[4px]">
            <div className="lg:hidden flex justify-between h-[39px] border-b-[0.5px] border-text-on-white py-[12px] px-[12px] font-bold text-text-on-white text-[12px]">
              <span className="flex justify-center w-[155px] "> 프롬프트</span>
              <span className="mx-[12px] w-[23px]">가격</span>
              <span className="w-[34px]">구매자</span>
            </div>
            {salesHistory.map((sale) => (
              <SalesHistoryCard key={sale.id} sale={sale} />
            ))}
          </div>
        </div>
      </div>

      {showModal && userInfo.balance < 10000 && (
        <TextModal text="10,000원부터 출금하실 수 있습니다." onClick={() => setShowModal(false)} size="lg" />
      )}
    </div>
  );
};

export default MyPayPage;
