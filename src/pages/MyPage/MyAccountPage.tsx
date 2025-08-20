import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import iconPerson from '@assets/icon-person-blue.svg';
import bluearrowIcon from '@assets/icon-arrow-left-blue.svg'; //추후 디자인 규격에 맞게 수정 필요
import blackarrowIcon from '@/assets/icon-arrow-left-black.svg';
import AccountDisplay from './components/AccountDisplay';
import AccountEditForm from './components/AccountEditForm';
import { useGetAccountInfo } from '@/hooks/queries/MyPage/useGetAccount';
import { useRegisterAccount, useUpdateAccount } from '@/hooks/mutations/MyPage/account';
import type { RegisterInfo, UpdateAccountInfo } from '@/types/MyPage/account';
import axios from 'axios';
import testicon from '@assets/testblueicon.svg';

interface accountInfo {
  account_id?: number;
  bank_name: string;
  bank_code?: string;
  account_number: string;
  account_holder: string;
}

const MyAccountPage = () => {
  const navigate = useNavigate();

  const { mutate: registerAccount } = useRegisterAccount();
  const { mutate: updateAccount } = useUpdateAccount();
  const { data: fetchedAccount } = useGetAccountInfo();
  // 'view' 또는 'edit' 모드를 관리하는 상태
  const [mode, setMode] = useState<'view' | 'edit'>('edit');
  // api 연결시 usestate가 불필요한 상태이므로 연동후 제거
  const [accountInfo, setAccountInfo] = useState<accountInfo | undefined>(undefined);

  useEffect(() => {
    if (fetchedAccount) {
      setAccountInfo(fetchedAccount);
      setMode('view'); // 정보가 있으면 '보기' 모드로 시작
    } else {
      setMode('edit'); // 정보가 없으면 '수정' 모드로 시작
    }
  }, [fetchedAccount]);

  const handleEditClick = () => {
    setMode('edit');
  };

  // '등록 완료' 버튼 클릭 시 (폼 제출)
  const handleSubmit = (formData: UpdateAccountInfo) => {
    if (!fetchedAccount) {
      const { bank_name, ...registerData } = formData;
      console.log('은행이름:', bank_name);
      registerAccount(registerData, {
        onSuccess: () => {
          setMode('view');
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.data.error === 'InvalidBankCode') {
              alert('유효하지 않은 은행 코드입니다. 은행을 다시 선택해주세요.');
            }
          }
        },
      });
    } else {
      updateAccount(formData, {
        onSuccess: () => {
          setMode('view');
        },
      });
    }
  };
  return (
    <div className="flex justify-center h-screen bg-background ">
      <div className="flex flex-col w-full max-w-[1236px] pt-[92px] max-lg:pt-[12px] max-lg:px-[12px] h-full">
        <div className="flex items-center gap-[10px] mb-[27px] max-lg:hidden">
          <img src={iconPerson} alt="person icon" className="w-[32px] h-[32px]" />
          <div className="text-[32px] text-primary-hover font-bold">회원정보</div>
        </div>

        <div className="relative flex items-center  h-[90px] max-lg:h-auto border-b-[1px] max-lg:border-b-[0px] border-primary-hover">
          <div className="flex justify-center max-lg:justify-center gap-[10px] h-[50px] max-lg:h-auto max-lg:w-full">
            <button
              onClick={() => navigate(-1)}
              className=" flex  justify-center   w-[24px] max-lg:w-[20px] h-[24px] max-lg:h-[20px] max-lg:mr-[66px]">
              <img src={bluearrowIcon} alt="뒤로가기" className="max-lg:hidden" />
              <img src={blackarrowIcon} alt="뒤로가기" className="lg:hidden" />
            </button>
            <span className="text-[24px] max-lg:text-[16px] text-primary-hover max-lg:text-[#2A2A2A] font-bold max-lg:font-medium">
              계좌 정보 등록
            </span>
          </div>
        </div>

        <div className="flex  ">
          {/* api 연결시 accountInfoResponse 로 변경*/}
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
