import { useState } from 'react';
import PossiblepayAmount from './components/PossiblepayAmount';
import SalesHistoryCard from './components/SalesHistoryCard';
import iconReceipt from '@assets/icon-receipt-primary.svg';
import TextModal from '@/components/Modal/TextModal';
import IconButton from '@components/Button/IconButton';
import CloseIcon from '@assets/icon-close.svg';
import clsx from 'clsx';
// 더미 데이터 예시
const DUMMY_USER_INFO = {
  nickname: '주토피아노',
  balance: 11100,
  hasAccount: false,
  accountNumber: 1234355533,
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
  const [showModal, setShowModal] = useState<'noMoney' | 'noAccount' | 'yesAccount' | 'complete' | null>(null);

  const handleWithdraw = () => {
    console.log('출금하기 모달을 엽니다.');

    if (!userInfo.hasAccount) {
      setShowModal('noAccount');
      return;
    } else {
      setShowModal('yesAccount');
    }
  };

  const closeModal = () => {
    setShowModal(null);
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

      {showModal === 'noAccount' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-lg:px-[20px]">
          <div className="absolute inset-0 bg-overlay"></div>

          <div
            className={clsx(
              'relative w-full py-[51.5px] max-lg:py-[20px] bg-white rounded-[16px] max-lg:rounded-[8px] shadow-gradient z-10  flex items-center justify-center max-w-[940px]',
            )}>
            <div className="flex flex-col items-center gap-[20px] max-lg:gap-[12px]">
              <p className="text-[32px] max-lg:text-[12px] font-bold leading-[40px] max-lg:leading-[15px] text-text-on-white">
                계좌를 등록해주세요
              </p>
              <p className="text-[22px] max-lg:text-[10px] font-medium leading-[40px] max-lg:leading-[15px] text-text-on-white">
                (마이페이지-회원정보-계좌 정보 등록)
              </p>
            </div>
            <div
              onClick={() => setShowModal(null)}
              className="absolute top-[20px] max-lg:top-[8px] right-[20px] max-lg:right-[8px] cursor-pointer max-lg:w-[12px] max-lg:h-[12px]">
              <img src={CloseIcon} alt="닫기" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {showModal === 'yesAccount' && userInfo.balance < 10000 && (
        <TextModal text="10,000원부터 출금하실 수 있습니다." onClick={() => setShowModal(null)} size="lg" />
      )}

      {showModal === 'yesAccount' && userInfo.balance > 10000 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-lg:px-[57px]">
          <div className="absolute inset-0 bg-overlay"></div>

          <div className="relative px-[150px] max-lg:px-[20px] py-[64px] max-lg:py-[20px] bg-white rounded-[16px] max-lg:rounded-[8px] shadow-gradient z-10 flex flex-col items-center justify-center gap-[24px] max-lg:gap-[12px] text-center max-lg:w-full">
            <div className="flex flex-col gap-[24px] max-lg:gap-[12px] ">
              <p className="text-[28px] max-lg:text-[10px] font-medium leading-[40px] max-lg:leading-[15px] text-text-on-white">
                우리은행 1002-536-732228
              </p>
              <p className="text-[32px] max-lg:text-[12px] font-bold leading-[40px] max-lg:leading-[15px] text-text-on-white">
                해당계좌로 출금할까요?
              </p>
            </div>
            <div className="flex gap-[41px] max-lg:gap-[20px]">
              <IconButton
                buttonType="round"
                style={'fill'}
                imgType="none"
                textButton="blue"
                text="예"
                onClick={() => setShowModal('complete')}
              />
              <IconButton
                buttonType="round"
                style={'outline'}
                imgType="none"
                textButton="white"
                text="아니오"
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      )}

      {showModal === 'complete' && (
        <TextModal text="출금이 완료되었습니다" onClick={() => setShowModal(null)} size="lg" />
      )}
    </div>
  );
};

export default MyPayPage;
