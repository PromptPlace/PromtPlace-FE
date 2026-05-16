import { useState, useRef } from 'react';
import SellerRegistrationStatusModal from './modal/SellerRegistrationStatusModal';
import type { SellerRegistrationModalType } from '@/types/MyPage/settlement';
import AttachFileIcon from '@assets/icon-attach-file-black.svg';
import DeleteIcon from '@assets/icon-delete.svg';
import CheckedSquareIcon from '@assets/icon-bi-check-square-primary.svg';
import NonCheckedSquareIcon from '@assets/icon-bi-noncheck-square2.svg';
import BankSelectDropdown from './BankSelectDropdown';
import type { Bank } from '../utils/banks';
import { getPortOneBankCodeByBankName } from '../utils/banks';
import { getAccountVerificationResult } from '../utils/accountVerification';

const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes >= 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
  }
  if (sizeInBytes >= 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)}KB`;
  }
  return `${sizeInBytes}B`;
};

type SellerType = 'individual' | 'business_individual' | 'business_corporate';

interface IndividualSellerRegistrationData {
  sellerType: SellerType;
  name?: string;
  birthDate?: string;
  representativeName?: string;
  businessNumber?: string;
  companyName?: string;
  businessLicenseUrl?: string;
  bank: string;
  accountNumber: string;
  holderName: string;
  isTermsAgreed: boolean;
}

type SellerRegistrationData = IndividualSellerRegistrationData;

interface SellerRegistrationFormProps {
  onSubmit?: (data: SellerRegistrationData) => void;
}

export default function SellerRegistrationForm({ onSubmit }: SellerRegistrationFormProps) {
  const [sellerType, setSellerType] = useState<SellerType>('individual');
  const [realName, setRealName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessRegistrationFile, setBusinessRegistrationFile] = useState<File | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [activeModalType, setActiveModalType] = useState<SellerRegistrationModalType | null>(null);
  const [pendingSubmitData, setPendingSubmitData] = useState<SellerRegistrationData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBusinessFileClear = () => {
    setBusinessRegistrationFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  //계좌 인증 요청 함수
  const handleAccountVerify = () => {
    const result = getAccountVerificationResult({
      selectedBank,
      accountNumber,
      accountHolder,
      sellerType,
      realName,
    });

    setIsAccountVerified(result.isVerified);
    setActiveModalType(result.modalType);
  };

  const handleSubmit = () => {
    if (!isAccountVerified) {
      setActiveModalType('bankCommunicationError');
      return;
    }

    if (!privacyAgreed) {
      return;
    }

    if (!selectedBank) {
      setActiveModalType('bankAccountMismatch');
      return;
    }

    const portOneBankCode = getPortOneBankCodeByBankName(selectedBank.name) ?? selectedBank.code;

    const data: SellerRegistrationData = {
      sellerType,
      bank: portOneBankCode,
      accountNumber,
      holderName: accountHolder,
      isTermsAgreed: privacyAgreed,
    };

    if (sellerType === 'individual') {
      data.name = realName;
      data.birthDate = birthDate;
    } else if (sellerType === 'business_individual') {
      data.birthDate = birthDate;
      // TODO: 파일 업로드 API 연동 후 반환받은 URL을 businessLicenseUrl에 사용하세요.
      data.businessLicenseUrl = businessRegistrationFile ? URL.createObjectURL(businessRegistrationFile) : '';
      data.representativeName = representativeName;
      data.businessNumber = businessRegistrationNumber.replace(/-/g, '');
      data.companyName = businessName;
    } else {
      // business_corporate
      // TODO: 파일 업로드 API 연동 후 반환받은 URL을 businessLicenseUrl에 사용하세요.
      data.businessLicenseUrl = businessRegistrationFile ? URL.createObjectURL(businessRegistrationFile) : '';
      data.representativeName = representativeName;
      data.businessNumber = businessRegistrationNumber.replace(/-/g, '');
      data.companyName = businessName;
    }

    const completedModalType =
      sellerType === 'individual' ? 'individualRegistrationComplete' : 'businessRegistrationComplete';
    setPendingSubmitData(data);
    setActiveModalType(completedModalType);
  };

  const handleModalClose = () => {
    const isRegistrationCompleteModal =
      activeModalType === 'individualRegistrationComplete' || activeModalType === 'businessRegistrationComplete';

    if (isRegistrationCompleteModal && pendingSubmitData) {
      onSubmit?.(pendingSubmitData);
      setPendingSubmitData(null);
    }

    setActiveModalType(null);
  };

  const BusinessFields = (
    <>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
            상호명
          </label>
          <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
            ※ 사업자등록증에 표기된 상호명을 입력해 주세요.
          </p>
        </div>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="예) 프롬프트 플레이스"
          className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
            사업자등록번호
          </label>
          <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
            ※ '-' 제외한 숫자만 입력해 주세요.
          </p>
        </div>
        <input
          type="text"
          value={businessRegistrationNumber}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
            let formatted = digits;
            if (digits.length > 5) formatted = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
            else if (digits.length > 3) formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
            setBusinessRegistrationNumber(formatted);
          }}
          placeholder="000-00-00000"
          className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
            사업자등록증
          </label>
          <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
            ※ 최대 10MB 이하의 JPG, PNG, PDF 파일만 업로드 가능합니다.
          </p>
        </div>
        <div className="flex items-center gap-[12px]">
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setBusinessRegistrationFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {businessRegistrationFile ? (
            <div className="flex h-[48px] w-full items-center gap-[16px] rounded-[8px] border-[0.8px] border-gray-400 bg-white px-[16px] py-[12px]">
              <div className="flex min-w-0 flex-1 items-center gap-[4px]">
                <img src={AttachFileIcon} alt="첨부 파일" className="size-[24px] shrink-0" />
                <p className="truncate text-[14px] font-medium leading-[1.5] text-gray-700 max-phone:text-[12px]">
                  {businessRegistrationFile.name}
                </p>
              </div>
              <p className="shrink-0 text-[12px] font-medium leading-[1.5] text-gray-700 max-phone:text-[10px]">
                {formatFileSize(businessRegistrationFile.size)}
              </p>
              <button type="button" onClick={handleBusinessFileClear} className="size-[24px] shrink-0">
                <img src={DeleteIcon} alt="파일 삭제" className="size-full object-contain" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-[8px] border-[0.8px] border-primary bg-white px-[12px] py-[6px] text-center text-[12px] font-medium leading-[1.5] text-primary max-phone:text-[10px] hover:bg-secondary focus:outline-none">
              파일 업로드
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-[20px]">
      {/* 제목 및 설명 */}
      <div className="flex flex-col gap-[12px] text-text-on-white">
        <h2 className="text-[24px] font-medium leading-[1.4] tracking-[-0.01em] max-phone:text-[22px]">판매자 등록</h2>
        <div className="text-[14px] font-light leading-[1.6] tracking-[0.02em] max-phone:text-[12px]">
          <p className="mb-0">프롬프트를 유료로 판매하기 위해서 판매자 등록을 진행해 주세요. </p>
          <p>
            판매자 등록은 프롬프트 플레이스에서 발생한 수익을 현금으로 출금하기 위해 필요한 금융 정보를 입력하고
            인증받는 절차입니다.
          </p>
        </div>
      </div>

      {/* 폼 카드 */}
      <div className="bg-white rounded-xl p-[24px] flex flex-col gap-[20px]">
        {/* 1. 등록 유형 */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
              등록 유형
            </label>
            <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
              ※ 개인•법인 사업자의 경우 사업자등록증이 필요합니다.
            </p>
          </div>
          <div className="flex gap-[20px] max-phone:gap-[8px]">
            {(['individual', 'business_individual', 'business_corporate'] as SellerType[]).map((type) => {
              const label =
                type === 'individual' ? '일반 개인 판매자' : type === 'business_individual' ? '개인 사업자' : '법인 사업자';
              return (
                <button
                  key={type}
                  onClick={() => setSellerType(type)}
                  className={`flex-1 h-[48px] px-[20px] py-[12px] rounded-xl border-[0.8px] font-medium text-[14px] leading-[1.5] max-phone:text-[12px] ${
                    sellerType === type
                      ? 'bg-secondary border-primary text-primary'
                      : 'bg-white border-gray-400 text-gray-700'
                  }`}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 일반 개인 판매자 필드 */}
        {sellerType === 'individual' && (
          <>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
                  실명
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
                  ※ 예금주와 동일한 이름을 입력해 주세요.
                </p>
              </div>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="예) 이은주"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
                  생년월일
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
                  ※ 6자리(YYMMDD) 형식으로 입력해 주세요.
                </p>
              </div>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                placeholder="예) 971211"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </>
        )}

        {/* 3. 개인 사업자 필드 */}
        {sellerType === 'business_individual' && (
          <>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
                  대표자명
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
                  ※ 사업자등록증에 표기된 대표자명을 입력해 주세요.
                </p>
              </div>
              <input
                type="text"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                placeholder="예) 이은주"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
                  생년월일
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
                  ※ 6자리(YYMMDD) 형식으로 입력해 주세요.
                </p>
              </div>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                placeholder="예) 971211"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {BusinessFields}
          </>
        )}

        {/* 4. 법인 사업자 필드 */}
        {sellerType === 'business_corporate' && (
          <>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
                  대표자명
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
                  ※ 사업자등록증에 표기된 대표자명을 입력해 주세요.
                </p>
              </div>
              <input
                type="text"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                placeholder="예) 이은주"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {BusinessFields}
          </>
        )}

        {/* 4. 은행 */}
        <BankSelectDropdown
          selectedBank={selectedBank}
          onSelectBank={setSelectedBank}
          label="은행"
          labelClassName="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]"
        />

        {/* 5. 계좌 번호 */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
              계좌 번호
            </label>
            <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em] max-phone:text-[10px]">
              ※ '-' 제외한 숫자만 입력해 주세요.
            </p>
          </div>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="숫자만 입력해 주세요."
            className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* 6. 예금주명 */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em] max-phone:text-[14px]">
              예금주명
            </label>
          </div>
          <div className="flex gap-[20px] items-center">
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="예) 이은주"
              className="flex-1 px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 max-phone:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleAccountVerify}
              disabled={!accountHolder || !accountNumber || !selectedBank}
              className="px-[20px] py-[12px] bg-white border-[0.8px] border-primary text-primary rounded-xl font-medium text-[14px] leading-[1.5] max-phone:text-[12px] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              계좌 인증하기
            </button>
          </div>
        </div>

        {/* 7. 개인정보 동의 */}
        <div className="flex items-center gap-[8px]">
          <input
            type="checkbox"
            id="privacy-agree"
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            className="sr-only"
          />
          <label htmlFor="privacy-agree" className="flex items-center gap-[8px] cursor-pointer">
            <img
              src={privacyAgreed ? CheckedSquareIcon : NonCheckedSquareIcon}
              alt=""
              aria-hidden="true"
              className="size-[20px] shrink-0"
            />
            <span className="custom-body2 leading-[1.6] tracking-[0.02em] max-phone:!text-[12px]">
              <span className="custom-button1 leading-[1.5] text-primary underline max-phone:!text-[12px]">
                판매자 등록 개인정보 수집 및 이용
              </span>
              에 동의합니다.
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="h-[48px] rounded-xl bg-primary text-white disabled:text-gray-400 text-[14px] font-medium leading-[1.5] max-phone:text-[12px] disabled:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedBank || !accountNumber || !accountHolder}>
          등록하기
        </button>
      </div>

      <SellerRegistrationStatusModal modalType={activeModalType} onClose={handleModalClose} />
    </div>
  );
}
