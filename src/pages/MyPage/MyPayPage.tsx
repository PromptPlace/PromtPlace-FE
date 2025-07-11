import { useState, useEffect } from 'react';
import PossiblepayAmount from './components/PossiblepayAmount';
import SalesHistoryCard from './components/SalesHistoryCard';
import iconReceipt from '@assets/icon-receipt-primary.svg';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TextModal from '@/components/Modal/TextModal';

// 더미 데이터 예시
const DUMMY_USER_INFO = {
  nickname: '주토피아노',
  balance: 2100,
};

const DUMMY_SALES_HISTORY = [
  { id: 1, date: '2025.06.13', title: '정부지원사업 무조건 선정되는 사업계획서 프롬프트', price: 2500, buyer: '홍길동' },
  { id: 2, date: '2025.06.12', title: '효율적인 경쟁사 분석 프롬프트', price: 2000, buyer: '율랄라' },
  { id: 3, date: '2025.06.11', title: '사업 아이디어 시장 검증 프롬프트', price: 1800, buyer: '지나가던 개발자' },

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
    <div className="flex items-center justify-center min-h-screen bg-background">
    <div className=" w-full max-w-[1231px] ">

      <div className="flex items-center gap-[4px] mb-[23px] py-[10px]">
        <img src={iconReceipt} alt="receipt" className="w-[32px] h-[32px] flex items-center justify-center" />
        <div className=" text-[32px] text-primary-hover font-bold ">정산관리</div>
      </div>

      <PossiblepayAmount 
        nickname={userInfo.nickname}
        balance={userInfo.balance}
        onWithdraw={handleWithdraw}
      />

      <div className="text-[24px] text-primary-hover font-bold pl-[40px] py-[20px] border-b-[1px] border-primary-hover">판매 내역</div>
      <div>
        {salesHistory.map(sale => (
          <SalesHistoryCard key={sale.id} sale={sale} />
        ))}
      </div>
    </div>
    {showModal && userInfo.balance < 10000 && (
      <TextModal text="10000원부터 출금하실 수 있습니다." onClick={() => setShowModal(false)} size="lg" />
    )}
    </div>
  );
};

export default MyPayPage
