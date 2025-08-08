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
    <div className="flex flex-col flex-1 gap-[40px] max-lg:gap-[12px] pt-[40px] max-lg:pt-[20px]">
      {/* 1. 은행 선택 */}
      <div className="flex lg:justify-between max-lg:flex-col h-[87px] relative">
        <label className="flex items-center text-[22px] max-lg:text-[14px] font-bold max-lg:font-medium text-[#2A2A2A] max-lg:mb-[12px]">
          은행 선택
        </label>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-[1082px] max-lg:w-auto pr-[40px] max-lg:px-[12px] max-lg:py-[16px] border-[1px] max-lg:border-[0.5px] border-white-stroke rounded-[8px] text-[18px] max-lg:text-[12px] text-right   font-normal  bg-white">
          {selectedBank ? (
            <span className="text-text-on-white ">{selectedBank}</span>
          ) : (
            <span className="flex lg:justify-end max-lg:justify-between gap-[8px]">
              <span className="text-text-on-background ">은행을 선택해주세요</span>
              <span
                className={`flex items-center justify-center rounded-[50px] w-[24px] max-lg:w-[16px] h-[24px] max-lg:h-[16px] ${isDropdownOpen ? 'bg-primary-pressed' : 'bg-transparent'}`}>
                <img src={arrowIcon} className="w-[11px] h-[6.5px]" />
              </span>
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute max-lg:fixed z-20 mt-[104px] right-[40px] max-lg:right-[0px] w-[264px] max-lg:w-full  mt-2 bg-white max-h-[579px] max-lg:max-h-[62vh] overflow-y-auto shadow-[0_4px_8px_0_rgba(0,0,0,0.12)] max-lg:shadow-[2px_2px_30px_0_rgba(0,0,0,0.25)] rounded-[8px] max-lg:rounded-t-[25px] border-[1px] max-lg:border-[0px] border-white-stroke">
            <div className="lg:hidden flex flex-col px-[20px] items-center mb-[8px]">
              <div className="w-[40px] h-[4px] bg-white-stroke rounded-full  mt-[14px] mb-[30px]" />
              <p className="text-[10px] font-medium text-primary self-start">은행 선택</p>
            </div>
            <div className="grid grid-cols-2 max-lg:grid-cols-3 gap-x-[24px] max-lg:gap-x-[16px] gap-y-[24px] max-lg:gap-y-[12px] p-[24px] max-lg:px-[16px] max-lg:py-[12px]">
              {BANKS.map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => handleBankSelect(bank.name)}
                  className="flex flex-col items-center justify-center w-[96px] max-lg:w-[72px] h-[74px] max-lg:w-[48px] bg-white hover:border-[1px] max-lg:hover:border-[0.5px] hover:border-primary">
                  <img
                    src={getBankLogoUrl(bank.fileName)}
                    alt={bank.name}
                    className="w-[40px] max-lg:w-[30px] h-[40px] max-lg:h-[30px]"
                  />
                  <span className="text-[14px] max-lg:text-[12px] text-text-on-white font-normal">{bank.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. 계좌번호 */}
      <div className="flex lg:justify-between max-lg:flex-col h-[87px]">
        <label className="flex items-center text-[22px] max-lg:text-[14px] font-bold max-lg:font-medium text-[#2A2A2A] max-lg:mb-[12px]">
          계좌번호 입력
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="계좌번호를 입력해주세요"
          className="w-[1082px] max-lg:w-auto pr-[40px] max-lg:px-[12px] max-lg:py-[16px] border-[1px] max-lg:border-[0.5px] border-white-stroke rounded-[8px] text-[18px] max-lg:text-[12px] text-right max-lg:text-left font-normal  bg-white focus:outline-none focus:border-primary"
        />
      </div>

      {/* 3. 예금주명 */}
      <div className="flex lg:justify-between max-lg:flex-col h-[87px]">
        <label className="flex items-center text-[22px] max-lg:text-[14px] font-bold max-lg:font-medium text-[#2A2A2A] max-lg:mb-[12px]">
          예금주명 입력
        </label>
        <input
          type="text"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          placeholder="예금주명을 입력해주세요"
          className="w-[1082px] max-lg:w-auto pr-[40px] max-lg:px-[12px] max-lg:py-[16px] border-[1px] max-lg:border-[0.5px] border-white-stroke rounded-[8px] text-[18px] max-lg:text-[12px] text-right max-lg:text-left font-normal  bg-white focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mt-[150px] max-lg:mt-[17px] lg:self-end  ">
        <button
          className="h-[60px] max-lg:h-[40px] py-[15px] max-lg:py-[10px] px-[29px] max-lg:px-[40px] bg-primary text-white text-[24px] max-lg:text-[16px] font-bold max-lg:font-medium rounded-[10px] max-lg:rounded-[4px] max-lg:w-full"
          onClick={handleFormSubmit}
          disabled={isSubmitDisabled}>
          등록 완료
        </button>
      </div>
    </div>
  );
};

export default AccountEditForm;
