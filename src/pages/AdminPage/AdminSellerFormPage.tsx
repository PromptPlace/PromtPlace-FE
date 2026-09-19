import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '@assets/icon-arrow-left-black.svg';
import TextModal from '@/components/Modal/TextModal.tsx';
import SellerCard from '@pages/AdminPage/components/AdminDashboardComponents/SellerCard.tsx';
import SellerFormDetailPanel from '@pages/AdminPage/components/AdminDashboardComponents/SellerFormDetailPanel.tsx';
import useGetIndividualSellerDetail from '@hooks/queries/AdminPage/useGetIndividualSellerDetail.ts';
import useGetBusinessSellerDetail from '@hooks/queries/AdminPage/useGetBusinessSellerDetail.ts';
import useGetPendingSellerDetail from '@hooks/queries/AdminPage/useGetPendingSellerDetail.ts';
import {
  mapIndividualDetailToCard,
  mapBusinessDetailToCard,
  mapPendingDetailToCard,
} from '@pages/AdminPage/utils/sellerMapper.ts';

export type SellerFormType = 'individual' | 'business' | 'pending';

interface AdminSellerFormPageProps {
  type: SellerFormType;
}

interface SellerFormViewProps {
  userId: number;
  onActionComplete: (message: string) => void;
}

const IndividualSellerFormView = ({ userId, onActionComplete }: SellerFormViewProps) => {
  const { data } = useGetIndividualSellerDetail(userId);
  if (!data) return null;
  const detail = data.data;

  return (
    <>
      <SellerCard seller={mapIndividualDetailToCard(detail)} showFormLink={false} onActionComplete={onActionComplete} />
      <SellerFormDetailPanel
        registrationTypeLabel="일반 개인 판매자"
        realName={detail.name}
        bankCode={detail.settlement_account.bank_code}
        accountNumber={detail.settlement_account.account_number}
        accountHolder={detail.settlement_account.account_holder}
      />
    </>
  );
};

const BusinessSellerFormView = ({ userId, onActionComplete }: SellerFormViewProps) => {
  const { data } = useGetBusinessSellerDetail(userId);
  if (!data) return null;
  const detail = data.data;

  return (
    <>
      <SellerCard seller={mapBusinessDetailToCard(detail)} showFormLink={false} onActionComplete={onActionComplete} />
      <SellerFormDetailPanel
        registrationTypeLabel="개인・법인 사업자"
        businessNumber={detail.business_number}
        representativeName={detail.representative_name}
        companyName={detail.company_name}
        businessLicenseUrl={detail.business_license_url}
        bankCode={detail.settlement_account.bank_code}
        accountNumber={detail.settlement_account.account_number}
        accountHolder={detail.settlement_account.account_holder}
      />
    </>
  );
};

const PendingSellerFormView = ({ userId, onActionComplete }: SellerFormViewProps) => {
  const { data } = useGetPendingSellerDetail(userId);
  if (!data) return null;
  const detail = data.data;

  return (
    <>
      <SellerCard seller={mapPendingDetailToCard(detail)} showFormLink={false} onActionComplete={onActionComplete} />
      <SellerFormDetailPanel
        registrationTypeLabel="개인・법인 사업자"
        businessNumber={detail.business_number}
        representativeName={detail.representative_name}
        companyName={detail.company_name}
        businessLicenseUrl={detail.business_license_url}
        bankCode={detail.bank_code}
        accountNumber={detail.account_number}
        accountHolder={detail.account_holder}
      />
    </>
  );
};

const AdminSellerFormPage = ({ type }: AdminSellerFormPageProps) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const numericUserId = Number(userId);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  // 처리가 끝난 신청/판매자의 상세 화면에는 더 할 수 있는 작업이 없으므로, 결과 모달을 닫으면 이전 화면으로 돌아갑니다.
  const handleResultModalClose = () => {
    setResultMessage(null);
    navigate(-1);
  };

  return (
    <div className="mx-[102px]">
      <div className="py-10 text-gray-950 text-3xl">관리자 대시보드</div>

      <div className="bg-white p-8 rounded-xl w-full">
        <div className="flex gap-4 mb-5">
          <img src={leftArrow} className="w-2 h-8 cursor-pointer" alt="뒤로가기 버튼" onClick={() => navigate(-1)} />
          <div className="text-2xl">판매자 등록폼</div>
        </div>

        {type === 'individual' && (
          <IndividualSellerFormView userId={numericUserId} onActionComplete={setResultMessage} />
        )}
        {type === 'business' && <BusinessSellerFormView userId={numericUserId} onActionComplete={setResultMessage} />}
        {type === 'pending' && <PendingSellerFormView userId={numericUserId} onActionComplete={setResultMessage} />}
      </div>

      {resultMessage && <TextModal text={resultMessage} onClick={handleResultModalClose} size="lg" />}
    </div>
  );
};

export default AdminSellerFormPage;
