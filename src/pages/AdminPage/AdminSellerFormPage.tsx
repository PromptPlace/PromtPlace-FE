import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '@assets/icon-arrow-left-black.svg';
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
import {
  getDummyIndividualSellerDetail,
  getDummyBusinessSellerDetail,
  getDummyPendingSellerDetail,
} from '@pages/AdminPage/utils/dummyDashboardData.ts';

export type SellerFormType = 'individual' | 'business' | 'pending';

interface AdminSellerFormPageProps {
  type: SellerFormType;
}

const IndividualSellerFormView = ({ userId }: { userId: number }) => {
  // 디자인 QA 목적으로 더미 데이터를 사용. API 호출 자체는 유지.
  useGetIndividualSellerDetail(userId);
  const detail = getDummyIndividualSellerDetail(userId);

  return (
    <>
      <SellerCard seller={mapIndividualDetailToCard(detail)} showFormLink={false} />
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

const BusinessSellerFormView = ({ userId }: { userId: number }) => {
  // 디자인 QA 목적으로 더미 데이터를 사용. API 호출 자체는 유지.
  useGetBusinessSellerDetail(userId);
  const detail = getDummyBusinessSellerDetail(userId);

  return (
    <>
      <SellerCard seller={mapBusinessDetailToCard(detail)} showFormLink={false} />
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

const PendingSellerFormView = ({ userId }: { userId: number }) => {
  // 디자인 QA 목적으로 더미 데이터를 사용. API 호출 자체는 유지.
  useGetPendingSellerDetail(userId);
  const detail = getDummyPendingSellerDetail(userId);

  return (
    <>
      <SellerCard seller={mapPendingDetailToCard(detail)} showFormLink={false} />
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

  return (
    <div className="mx-[102px]">
      <div className="py-10 text-gray-950 text-3xl">관리자 대시보드</div>

      <div className="bg-white p-8 rounded-xl w-full">
        <div className="flex gap-4 mb-5">
          <img src={leftArrow} className="w-2 h-8 cursor-pointer" alt="뒤로가기 버튼" onClick={() => navigate(-1)} />
          <div className="text-2xl">판매자 등록폼</div>
        </div>

        {type === 'individual' && <IndividualSellerFormView userId={numericUserId} />}
        {type === 'business' && <BusinessSellerFormView userId={numericUserId} />}
        {type === 'pending' && <PendingSellerFormView userId={numericUserId} />}
      </div>
    </div>
  );
};

export default AdminSellerFormPage;
