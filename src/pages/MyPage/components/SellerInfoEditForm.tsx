import { useState, useRef } from 'react';
import type { SellerInfoEditFormData, SellerType } from '@/types/MyPage/sellerInfo';
import AttachFileIcon from '@assets/icon-attach-file-black.svg';
import DeleteIcon from '@assets/icon-delete.svg';
import BankSelectDropdown from './BankSelectDropdown';
import { BANKS, getBankInfoByPortOneCode, getPortOneBankCodeByBankName, type Bank } from '../utils/banks';
import SellerRegistrationStatusModal from './modal/SellerRegistrationStatusModal';
import type { SellerRegistrationModalType } from '@/types/MyPage/settlement';
import { getAccountVerificationResult } from '../utils/accountVerification';
import CheckedSquareIcon from '@assets/icon-bi-check-square-primary.svg';
import NonCheckedSquareIcon from '@assets/icon-bi-noncheck-square2.svg';

const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes >= 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
  }
  if (sizeInBytes >= 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)}KB`;
  }
  return `${sizeInBytes}B`;
};

interface SellerInfoEditFormProps {
  initialData?: SellerInfoEditFormData;
  onSubmit: (data: SellerInfoEditFormData) => void;
  onCancel: () => void;
  onAccountVerify?: () => void;
}

const SellerInfoEditForm = ({ initialData, onSubmit, onCancel, onAccountVerify }: SellerInfoEditFormProps) => {
  // 필드들의 상태
  const [sellerType, setSellerType] = useState<SellerType>(initialData?.sellerType || 'individual');
  const [realName, setRealName] = useState(initialData?.name || '');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState(initialData?.businessNumber || '');
  const [representativeName, setRepresentativeName] = useState(initialData?.representativeName || '');
  const [businessName, setBusinessName] = useState(initialData?.companyName || '');
  const [businessRegistrationFile, setBusinessRegistrationFile] = useState<File | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(
    initialData
      ? (() => {
          const bankInfo = getBankInfoByPortOneCode(initialData.bank);
          return BANKS.find((b) => b.name === bankInfo?.name) || null;
        })()
      : null,
  );
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || '');
  const [accountHolder, setAccountHolder] = useState(initialData?.holderName || '');
  const [privacyAgreed, setPrivacyAgreed] = useState(initialData?.isTermsAgreed || false);
  const [accountVerified, setAccountVerified] = useState(false);
  const [activeModalType, setActiveModalType] = useState<SellerRegistrationModalType | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 수정하기 버튼 활성화 조건
  // 1. 모든 텍스트 필드에 입력값이 있어야 함
  // 2. 계좌 인증 필수
  // 3. 개인정보 수집 및 이용에 동의 필수
  const isIndividualInfoInvalid = !realName;
  const isBusinessInfoInvalid =
    !businessRegistrationNumber || !representativeName || !businessName || !businessRegistrationFile;
  const isSubmitDisabled =
    (sellerType === 'individual' ? isIndividualInfoInvalid : isBusinessInfoInvalid) ||
    !selectedBank ||
    !accountNumber ||
    !accountHolder ||
    !accountVerified ||
    !privacyAgreed;

  const handleBusinessFileClear = () => {
    setBusinessRegistrationFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = () => {
    if (!isSubmitDisabled && selectedBank) {
      const portOneBankCode = getPortOneBankCodeByBankName(selectedBank.name) ?? selectedBank.code;

      onSubmit({
        sellerType,
        name: sellerType === 'individual' ? realName : undefined,
        businessNumber: sellerType === 'business' ? businessRegistrationNumber.replace(/-/g, '') : undefined,
        representativeName: sellerType === 'business' ? representativeName : undefined,
        companyName: sellerType === 'business' ? businessName : undefined,
        businessLicenseUrl:
          sellerType === 'business'
            ? businessRegistrationFile
              ? URL.createObjectURL(businessRegistrationFile)
              : initialData?.businessLicenseUrl || ''
            : undefined,
        bank: portOneBankCode,
        accountNumber,
        holderName: accountHolder,
        isTermsAgreed: privacyAgreed,
      });
    }
  };

  const handleAccountVerify = () => {
    const result = getAccountVerificationResult({
      selectedBank,
      accountNumber,
      accountHolder,
      sellerType,
      realName,
    });

    setAccountVerified(result.isVerified);
    setActiveModalType(result.modalType);

    if (!result.isVerified) {
      return;
    }

    onAccountVerify?.();
  };

  return (
    <div className="flex flex-col gap-[40px] w-full">
      {/* 제목 및 설명 */}
      <div className="flex flex-col gap-[12px]">
        <h2 className="custom-h2 text-text-on-white">판매자 정보 수정</h2>
        <p className="custom-body2 text-gray-700">
          정확한 정산을 위해 모든 항목을 빠짐없이 입력해 주세요.
          <br />
          계좌 인증과 '판매자 등록 개인정보 수집 및 이용 동의'를 완료해야 수정이 가능합니다.
        </p>
      </div>

      {/* 폼 컨테이너 */}
      <div className="flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]">
        {/* 1. 등록 유형 */}
        <div className="flex flex-col gap-[12px] h-auto">
          <div className="flex flex-col gap-[4px]">
            <label className="custom-h5 text-text-on-white">등록 유형</label>
            <p className="custom-body3 text-gray-700">※ 개인•법인 사업자의 경우 사업자등록증이 필요합니다.</p>
          </div>

          <div className="flex gap-[20px]">
            <button
              type="button"
              onClick={() => setSellerType('individual')}
              className={`flex-1 h-[48px] px-[20px] py-[12px] rounded-[12px] border-[0.8px] custom-button1 transition-colors ${
                sellerType === 'individual'
                  ? 'border-primary bg-secondary text-primary'
                  : 'border-gray-400 bg-white text-gray-700 hover:border-gray-300'
              }`}>
              일반 개인 판매자
            </button>
            <button
              type="button"
              onClick={() => setSellerType('business')}
              className={`flex-1 h-[48px] px-[20px] py-[12px] rounded-[12px] border-[0.8px] custom-button1 transition-colors ${
                sellerType === 'business'
                  ? 'border-primary bg-secondary text-primary'
                  : 'border-gray-400 bg-white text-gray-700 hover:border-gray-300'
              }`}>
              개인•법인 사업자
            </button>
          </div>
        </div>

        {/* 2. 실명 */}
        {sellerType === 'individual' && (
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[4px]">
              <label className="custom-h5 text-text-on-white">실명</label>
              <p className="custom-body3 text-gray-700">※ 예금주와 동일한 이름을 입력해 주세요.</p>
            </div>

            <input
              type="text"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              placeholder="예) 이은주"
              className="h-[48px] rounded-[8px] bg-gray-50 px-[16px] py-[12px] custom-body2 text-text-on-white placeholder:text-gray-400 focus:border-primary focus:outline-none"
            />
          </div>
        )}

        {/* 3. 사업자 정보 */}
        {sellerType === 'business' && (
          <>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em]">
                  대표자명
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em]">
                  ※ 사업자등록증에 표기된 대표자명을 입력해 주세요.
                </p>
              </div>

              <input
                type="text"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                placeholder="예) 이은주"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em]">
                  상호명
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em]">
                  ※ 사업자등록증에 표기된 상호명을 입력해 주세요.
                </p>
              </div>

              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="예) 프롬프트 플레이스"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em]">
                  사업자등록번호
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em]">
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
                placeholder="숫자만 입력해 주세요"
                className="w-full px-[16px] py-[12px] bg-gray-50 rounded-lg text-[14px] font-light leading-[1.6] tracking-[0.02em] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[16px] font-medium text-text-on-white leading-[1.4] tracking-[-0.01em]">
                  사업자등록증
                </label>
                <p className="text-[12px] font-light text-gray-700 leading-[1.4] tracking-[-0.01em]">
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
                      <p className="truncate text-[14px] font-medium leading-[1.5] text-gray-700">
                        {businessRegistrationFile.name}
                      </p>
                    </div>
                    <p className="shrink-0 text-[12px] font-medium leading-[1.5] text-gray-700">
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
                    className="rounded-[8px] border-[0.8px] border-primary bg-white px-[12px] py-[6px] text-center text-[12px] font-medium leading-[1.5] text-primary hover:bg-secondary focus:outline-none">
                    파일 업로드
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* 4. 은행 */}
        <BankSelectDropdown
          selectedBank={selectedBank}
          onSelectBank={setSelectedBank}
          label="은행"
          labelClassName="custom-h5 text-text-on-white"
        />

        {/* 5. 계좌 번호 */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label className="custom-h5 text-text-on-white">계좌 번호</label>
            <p className="custom-body3 text-gray-700">※ '-' 제외한 숫자만 입력해 주세요.</p>
          </div>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="계좌번호를 입력해주세요"
            className="h-[48px] rounded-[8px] bg-gray-50 px-[16px] py-[12px] custom-body2 text-text-on-white placeholder:text-gray-400 focus:border-primary focus:outline-none"
          />
        </div>

        {/* 6. 예금주명 + 계좌 인증하기 */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label className="custom-h5 text-text-on-white">예금주명</label>
          </div>

          <div className="flex gap-[20px]">
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="예금주명을 입력해주세요"
              className="flex-1 h-[48px] rounded-[8px] bg-gray-50 px-[16px] py-[12px] custom-body2 text-text-on-white placeholder:text-gray-400 focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAccountVerify}
              disabled={!accountHolder || !accountNumber || !selectedBank}
              className="h-[48px] rounded-[12px] border-[0.8px] border-primary bg-white px-[20px] py-[12px] custom-button1 text-primary transition-colors hover:bg-secondary disabled:border-gray-300 disabled:text-gray-400">
              계좌 인증하기
            </button>
          </div>

          {accountVerified && <p className="custom-body3 text-primary">✓ 계좌가 인증되었습니다.</p>}
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
            <span className="custom-body2 leading-[1.6] tracking-[0.02em]">
              <span className="custom-button1 leading-[1.5] text-primary underline">
                판매자 등록 개인정보 수집 및 이용
              </span>
              에 동의합니다.
            </span>
          </label>
        </div>

        {/* 버튼 */}
        <div className="flex gap-[20px]">
          <button
            type="button"
            onClick={onCancel}
            className="h-[65px] flex-1 rounded-[12px] border-[0.8px] border-primary bg-white py-[20px] custom-h5 text-primary transition-colors hover:bg-secondary">
            취소
          </button>
          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitDisabled}
            className="h-[65px] flex-1 rounded-[12px] bg-primary py-[20px] custom-h5 text-white transition-colors disabled:bg-gray-400">
            수정하기
          </button>
        </div>

        <SellerRegistrationStatusModal modalType={activeModalType} onClose={() => setActiveModalType(null)} />
      </div>
    </div>
  );
};

export default SellerInfoEditForm;
