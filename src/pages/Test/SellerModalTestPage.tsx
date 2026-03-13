import { useMemo, useState } from 'react';
import SellerRegistrationStatusModal from '@/pages/MyPage/components/modal/SellerRegistrationStatusModal';
import type { SellerRegistrationModalType } from '@/types/MyPage/settlement';

const SellerModalTestPage = () => {
  const [activeModalType, setActiveModalType] = useState<SellerRegistrationModalType | null>(null);

  const modalTypes = useMemo<SellerRegistrationModalType[]>(
    () => [
      'verificationSuccess',
      'nameMismatch',
      'bankAccountMismatch',
      'accountNotFound',
      'accountUnavailable',
      'unsupportedAccountType',
      'bankCommunicationError',
      'bankMaintenanceTime',
      'dailyVerificationLimitExceeded',
      'individualRegistrationComplete',
      'businessRegistrationComplete',
    ],
    [],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[16px] px-[20px] py-[40px]">
      <h2 className="custom-h2 text-text-on-white">Seller Modal Test</h2>
      <p className="custom-body2 text-gray-700">버튼을 눌러 판매자 모달 문구를 하나씩 확인할 수 있습니다.</p>

      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-3">
        {modalTypes.map((modalType) => (
          <button
            key={modalType}
            type="button"
            onClick={() => setActiveModalType(modalType)}
            className="rounded-[12px] border border-primary bg-white px-[16px] py-[12px] text-left custom-button1 text-primary">
            {modalType}
          </button>
        ))}
      </div>

      <SellerRegistrationStatusModal
        modalType={activeModalType}
        onClose={() => setActiveModalType(null)}
        onAction={() => setActiveModalType(null)}
      />
    </div>
  );
};

export default SellerModalTestPage;
