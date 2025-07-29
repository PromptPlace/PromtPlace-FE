import { useState } from 'react';
import arrowIcon from '@/assets/icon-arrow-down.svg';

/**
 * 조회수 및 다운로드 수를 나타내는 컴포넌트입니다.
 *
 * @수정해야_할_디자인
 *   은행 로고 이미지 세부 작업
 *   드롭다운 스크롤바 위치 조정 작업
 *
 *
 *
 * @author 류동현
 * **/

const BANKS = [
  { name: '토스뱅크', fileName: 'Toss.svg' },
  { name: '카카오뱅크', fileName: 'Kakao.svg' },
  { name: '하나은행', fileName: 'Hana.svg' },
  { name: '우리은행', fileName: 'Woori.svg' },
  { name: '신한은행', fileName: 'Shinhan.svg' },
  { name: 'KB국민은행', fileName: 'KB.svg' },
  { name: 'IBK기업은행', fileName: 'IBK.svg' },
  { name: 'KDB산업은행', fileName: 'KDB.svg' },
  { name: '케이뱅크', fileName: 'K.svg' },
  { name: 'SC제일은행', fileName: 'SC.svg' },
  { name: '씨티은행', fileName: 'City.svg' },
  { name: '새마을금고', fileName: 'Saemaul.svg' },
  { name: 'NH농협은행', fileName: 'NH.svg' },
  { name: '우체국', fileName: 'Post.svg' },
  { name: '부산은행', fileName: 'Busan.svg' },
  { name: '제주은행', fileName: 'Jeju.svg' },
  { name: '광주은행', fileName: 'Gwangju.svg' },
  { name: '전북은행', fileName: 'Jeonbuk.svg' },
  { name: 'DGB대구은행', fileName: 'Daegu.svg' },
  { name: 'Sh수협은행', fileName: 'Suhyup.svg' },
];
const getBankLogoUrl = (fileName: string) => {
  // new URL(상대 경로, 기준 URL)
  // import.meta.url은 현재 모듈의 URL을 나타냅니다.
  return new URL(`/src/assets/banks/${fileName}`, import.meta.url).href;
};

interface AccountInfo {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

interface AccountEditFormProps {
  onSubmit: (info: AccountInfo) => void;
}

const AccountEditForm = ({ onSubmit }: AccountEditFormProps) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const isSubmitDisabled = !selectedBank || !accountNumber || !accountHolder;

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    setIsDropdownOpen(false); // 은행 선택 후 드롭다운 닫기
  };

  const handleFormSubmit = () => {
    // 유효성 검사 통과 시, 부모에게 데이터 전달
    if (!isSubmitDisabled) {
      onSubmit({
        bank: selectedBank,
        accountNumber,
        accountHolder,
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-[40px] pt-[40px] max-lg:pt-6 max-lg:gap-6">
      {/* 1. 은행 선택 */}
      <div className="flex justify-between h-[87px] relative">
        <label className="flex items-center text-[22px] font-bold text-[#2A2A2A]  max-lg:text-base max-lg:mb-2">
          은행 선택
        </label>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-[1082px]  pr-[40px] border-[1px] border-white-stroke rounded-[8px] text-[18px] text-right  font-normal  bg-white">
          {selectedBank ? (
            <span className="text-text-on-white ">{selectedBank}</span>
          ) : (
            <span className="flex justify-end gap-[8px]">
              <span className="text-text-on-background ">은행을 선택해주세요</span>
              <span
                className={`flex items-center justify-center rounded-[50px] w-[24px] h-[24px] ${isDropdownOpen ? 'bg-primary-pressed text-white' : 'bg-transparent'}`}>
                <img src={arrowIcon} className="w-[11px] h-[6.5px]" />
              </span>
            </span>
          )}
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 mt-[104px] right-[40px] w-[264px] mt-2 bg-white max-h-[579px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-x-[24px] gap-y-[24px] p-[24px]">
              {BANKS.map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => handleBankSelect(bank.name)}
                  className="flex flex-col items-center justify-center w-[96px] h-[74px] bg-white hover:bg-[#D9D9D9] ">
                  <img src={getBankLogoUrl(bank.fileName)} alt={bank.name} className="w-[40px] h-[40px] rounded-full" />
                  <span className="text-[14px] text-text-on-white font-normal">{bank.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. 계좌번호 */}
      <div className="flex justify-between h-[87px]">
        <label className="flex items-center text-[22px] font-bold text-[#2A2A2A]  max-lg:text-base max-lg:mb-2">
          계좌번호 입력
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="계좌번호를 입력해주세요"
          className="w-[1082px]  pr-[40px] border-[1px] border-white-stroke rounded-[8px] text-[18px] text-right text-text-on-white placeholder:text-text-on-background font-normal  bg-white"
        />
      </div>

      {/* 3. 예금주명 */}
      <div className="flex justify-between h-[87px]">
        <label className="flex items-center text-[22px] font-bold text-[#2A2A2A]  max-lg:text-base max-lg:mb-2">
          예금주명 입력
        </label>
        <input
          type="text"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          placeholder="예금주명을 입력해주세요"
          className="w-[1082px]  pr-[40px] border-[1px] border-white-stroke rounded-[8px] text-[18px] text-right text-text-on-white placeholder:text-text-on-background font-normal  bg-white"
        />
      </div>

      <div className="mt-[150px] self-end">
        <button
          className="py-[15px] px-[29px] bg-primary text-white text-[24px] font-bold rounded-[10px]"
          onClick={handleFormSubmit}
          disabled={isSubmitDisabled}>
          등록 완료
        </button>
      </div>
    </div>
  );
};

export default AccountEditForm;
