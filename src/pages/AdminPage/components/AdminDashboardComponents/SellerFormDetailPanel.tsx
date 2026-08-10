import React from 'react';
import { getBankInfoByPortOneCode, formatBankAccountNumber } from '@/pages/MyPage/utils/banks';

interface SellerFormDetailPanelProps {
  registrationTypeLabel: string;
  businessNumber?: string;
  representativeName?: string;
  companyName?: string;
  businessLicenseUrl?: string | null;
  realName?: string;
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
}

const FormFieldRow = ({ label, value }: { label: string; value: string }) => (
  <div className="self-stretch flex flex-col justify-start items-start gap-3">
    <div className="self-stretch justify-center text-gray-950 text-base font-medium leading-6">{label}</div>
    <div className="self-stretch inline-flex justify-start items-center gap-10">
      <div className="flex-1 px-4 py-3 bg-white rounded-lg flex justify-center items-center gap-3">
        <div className="flex-1 justify-start text-gray-700 text-sm font-medium leading-5">{value}</div>
      </div>
    </div>
  </div>
);

const SellerFormDetailPanel = ({
  registrationTypeLabel,
  businessNumber,
  representativeName,
  companyName,
  businessLicenseUrl,
  realName,
  bankCode,
  accountNumber,
  accountHolder,
}: SellerFormDetailPanelProps) => {
  const bankInfo = getBankInfoByPortOneCode(bankCode);
  const bankName = bankInfo?.name ?? bankCode;
  const formattedAccountNumber = formatBankAccountNumber(bankName, accountNumber);

  return (
    <div className="self-stretch p-6 bg-white rounded-xl flex flex-col justify-start items-start gap-5">
      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <div className="self-stretch h-5 justify-center text-gray-950 text-base font-medium leading-6">등록 유형</div>
        <div className="self-stretch inline-flex justify-start items-center gap-10">
          <div className="flex-1 px-4 py-3 bg-white rounded-lg flex justify-center items-center gap-3">
            <div className="flex-1 justify-start text-gray-700 text-sm font-medium leading-5">
              {registrationTypeLabel}
            </div>
          </div>
        </div>
      </div>

      {businessNumber !== undefined && <FormFieldRow label="사업자등록번호" value={businessNumber} />}
      {representativeName !== undefined && <FormFieldRow label="대표자명" value={representativeName} />}
      {companyName !== undefined && <FormFieldRow label="상호명" value={companyName} />}

      {businessLicenseUrl !== undefined && businessLicenseUrl !== null && (
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          <div className="self-stretch h-5 justify-center text-gray-950 text-base font-medium leading-6">
            사업자등록증
          </div>
          <a
            href={businessLicenseUrl}
            target="_blank"
            rel="noreferrer"
            className="self-stretch px-4 py-2.5 bg-white rounded-xl outline outline-[0.80px] outline-offset-[-0.80px] outline-gray-300 inline-flex justify-start items-center gap-2">
            <div className="flex-1 justify-start text-primary text-sm font-medium leading-5 underline">
              사업자 등록증 확인하기
            </div>
          </a>
        </div>
      )}

      {realName !== undefined && <FormFieldRow label="실명" value={realName} />}

      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <div className="self-stretch justify-center text-gray-950 text-base font-medium leading-6">은행</div>
        <div className="self-stretch px-4 py-3 bg-white rounded-lg inline-flex justify-center items-center gap-3">
          {bankInfo?.logoUrl && <img src={bankInfo.logoUrl} alt={bankName} className="size-8 rounded-full" />}
          <div className="flex-1 justify-start text-gray-700 text-base font-medium leading-6">{bankName}</div>
        </div>
      </div>

      <FormFieldRow label="계좌 번호" value={formattedAccountNumber} />
      <FormFieldRow label="예금주명" value={accountHolder} />
    </div>
  );
};

export default SellerFormDetailPanel;
