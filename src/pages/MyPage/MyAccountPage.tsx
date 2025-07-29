import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import iconPerson from '@assets/icon-person-blue.svg';
import bluearrowIcon from '@assets/icon-arrow-left-blue.svg'; //추후 디자인 규격에 맞게 수정 필요
import AccountDisplay from './components/AccountDisplay';
import AccountEditForm from './components/AccountEditForm';

interface accountInfo {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

const MyAccountPage = () => {
  const navigate = useNavigate();

  // 'view' 또는 'edit' 모드를 관리하는 상태
  const [mode, setMode] = useState<'view' | 'edit'>('edit');
  // 등록된 계좌 정보를 관리하는 상태 (API로 받아온다고 가정)
  const [accountInfo, setAccountInfo] = useState<accountInfo | undefined>(undefined);

  useEffect(() => {
    // 예시: API 호출로 계좌 정보를 가져오는 로직
    // const fetchedAccount = fetchUserAccount();
    const fetchedAccount = { bank: '토스뱅크', accountNumber: '1234-5678-9101', accountHolder: '안송연' }; // 임시 데이터

    if (accountInfo) {
      setAccountInfo(fetchedAccount);
      setMode('view'); // 정보가 있으면 '보기' 모드로 시작
    } else {
      setMode('edit'); // 정보가 없으면 '수정' 모드로 시작
    }
  }, []);

  const handleEditClick = () => {
    setMode('edit');
  };

  // '등록 완료' 버튼 클릭 시 (폼 제출)
  const handleSubmit = () => {
    // 1. API로 데이터 전송
    // 2. 성공적으로 응답 받으면, 상태 업데이트 및 모드 변경
    const newAccountInfo = { bank: '카카오뱅크', accountNumber: '1111-2222-3333', accountHolder: '안송연' }; // 새로 등록된 정보라고 가정
    setAccountInfo(newAccountInfo);
    setMode('view');
  };

  return (
    <div className="flex justify-center h-screen bg-background ">
      <div className="flex flex-col w-full max-w-[1236px] pt-[92px] h-full">
        <div className="flex items-center gap-[10px] mb-[27px]">
          <img src={iconPerson} alt="person icon" className="w-[32px] h-[32px]" />
          <div className="text-[32px] text-primary-hover font-bold">회원정보</div>
        </div>

        <div className="flex items-center h-[90px] border-b-[1px] border-primary-hover">
          <div className="flex items-center gap-[10px] h-[50px] ">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center  w-[24px] h-[24px]">
              <img src={bluearrowIcon} alt="뒤로가기" />
            </button>
            <span className="text-[24px] text-primary-hover font-bold">계좌 정보 등록</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-[40px] pt-[40px]">
          {mode === 'view' ? (
            <AccountDisplay accountInfo={accountInfo} onEditClick={handleEditClick} />
          ) : (
            <AccountEditForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
