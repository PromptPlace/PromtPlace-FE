import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AccountDetail, MonthlySaleItem, SettlementAccountInfoSectionData } from '@/types/MyPage/settlement';
import type { SellerInfoEditFormData, SellerType } from '@/types/MyPage/sellerInfo';
import type { SellerSettlementDashboardData } from './SellerSettlementDashboard';
import SellerSettlementDashboard from './SellerSettlementDashboard';
import SellerApprovalPending from './SellerApprovalPending';
import SellerNotRegistered from './SellerNotRegistered';
import SellerRegistrationForm from './SellerRegistrationForm';
import SellerInfoEditForm from './SellerInfoEditForm';
import MonthlySalesHistorySection from './settlement/MonthlySalesHistorySection';
import useGetMonthlySales from '@/hooks/queries/MyPage/useGetMonthlySales.ts';
import useGetSettlementPendingAmount from '@/hooks/queries/MyPage/useGetSettlementPendingAmount.ts';
import useGetYearlySettlement from '@hooks/queries/MyPage/useGetYearlySettlement.ts';
import useGetSettlementAccountDetail from '@/hooks/queries/MyPage/useGetSettlementAccountDetail.ts';

const THUMBNAIL_IMAGE = 'http://localhost:3845/assets/5dbfecdc6cc3deee5512c688789a5fb79b5d117c.png';
const MOCK_SELLER_REGISTERED_AT = '2025-11-01';

// account/detail 응답의 sellerType/businessType을 판매자 정보 수정 폼의 SellerType으로 변환
const toEditFormSellerType = (accountDetail?: AccountDetail): SellerType => {
  if (!accountDetail || accountDetail.sellerType !== 'BUSINESS') {
    return 'individual';
  }
  return accountDetail.businessType === 'CORPORATE' ? 'business_corporate' : 'business_individual';
};

const toMonthLabel = (year: number, month: number) => `${year}년 ${month}월`;
const toYearLabel = (year: number) => `${year}년`;
const parseYearLabel = (label: string) => Number(label.replace('년', '').trim());

// 가입일 기준 드롭다운 월 옵션 생성 생성
const buildMonthOptionsSince = (registeredAt: string) => {
  const registeredDate = new Date(registeredAt);
  const now = new Date();

  if (Number.isNaN(registeredDate.getTime())) {
    return [toMonthLabel(now.getFullYear(), now.getMonth() + 1)];
  }

  const cursor = new Date(registeredDate.getFullYear(), registeredDate.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthLabels: string[] = [];

  while (cursor <= end) {
    monthLabels.push(toMonthLabel(cursor.getFullYear(), cursor.getMonth() + 1));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return monthLabels.reverse();
};

interface DashboardTabContentProps {
  sellerStatusFromQuery: string | null;
}

const DashboardTabContent = ({ sellerStatusFromQuery }: DashboardTabContentProps) => {
  const navigate = useNavigate();

  // 판매자 상태 조회 (등록 여부/승인 상태/계좌 정보 prefill)
  const { data: accountDetailResponse, isError: isAccountDetailError } = useGetSettlementAccountDetail();
  const accountDetail = accountDetailResponse?.data;

  // 판매자 상태 관리
  const isSellerRegistered = !isAccountDetailError;
  const isSellerApprovalPending = accountDetail?.status === 'PENDING' || sellerStatusFromQuery === 'pending';
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // 연/월 및 페이지네이션 상태 관리
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [currentPage, setCurrentPage] = useState(1);

  // UI 드롭다운 및 뷰 상태 관리
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [showMonthlySalesDetailView, setShowMonthlySalesDetailView] = useState(false);
  const [showSellerInfoEditView, setShowSellerInfoEditView] = useState(false);

  const settlementAccountInfo = useMemo<SettlementAccountInfoSectionData>(
    () => ({
      bank: accountDetail?.bank ?? '',
      accountNumber: accountDetail?.accountNumber ?? '',
      holderName: accountDetail?.holderName ?? '',
    }),
    [accountDetail],
  );

  // 상태 결합용 계산 변수
  const selectedMonthLabel = useMemo(() => toMonthLabel(selectedYear, selectedMonth), [selectedYear, selectedMonth]);
  const monthOptions = useMemo(() => buildMonthOptionsSince(MOCK_SELLER_REGISTERED_AT), []);

  // 데이터 API 호출 바인딩
  // 월별 판매 내역 API
  const { data: monthlySalesRawData } = useGetMonthlySales({
    params: {
      year: selectedYear,
      month: selectedMonth,
      page: currentPage,
      limit: 10,
    },
  });

  // 연도별 판매 내역 API
  const { data: yearlySalesData } = useGetYearlySettlement();

  // 정산 예정 금액 API
  const { data: pendingAmountRawData } = useGetSettlementPendingAmount();

  // API 원본 데이터를 UI 컴포넌트용 Interface 구조로 매핑
  const mappedSalesItems = useMemo<MonthlySaleItem[]>(() => {
    if (!monthlySalesRawData?.items) return [];

    return monthlySalesRawData.items.map((item) => ({
      purchaseId: item.settlement_id,
      promptId: item.prompt_id,
      thumbnailUrl: THUMBNAIL_IMAGE, // 현재 백엔드 API에 썸네일 반환이 없어서 수정 필요함
      title: item.prompt_title,
      saleDate: item.sold_at ? item.sold_at.split('T')[0].replace(/-/g, '.') : '',
      price: item.sale_price,
      status: item.status === 'Refunded' ? 'REFUNDED' : 'COMPLETED',
    }));
  }, [monthlySalesRawData]);

  // 대시보드 최종 데이터
  const settlementDashboardData = useMemo<SellerSettlementDashboardData>(() => {
    const pendingAmount = pendingAmountRawData?.pending_amount ?? 0;

    // 비즈니스 로직에 따른 수수료 계산
    const serviceFee = Math.round(pendingAmount * 0.1);
    const vatAmount = Math.round(serviceFee * 0.1);

    // 연도별 API 응답 중 현재 선택된 연도 데이터 필터리
    const selectedYearData = yearlySalesData?.items?.find((item) => item.year === selectedYear);

    // 누적 정산 금액 매핑
    const totalAccumulatedAmount = selectedYearData?.succeeded_amount ?? 0;

    // api 응답 기반 연도 선택 드롭다운 동적 관리 -> 데이터 없는 경우 2026으로 고정
    const dynamicYearOptions = yearlySalesData?.items?.length
      ? yearlySalesData.items.map((item) => toYearLabel(item.year))
      : // 현재 2026으로 하드코딩 된 상태. 추후 현재 연도 기반 동적 생성으로 리팩토링 필요.
        [2026].map(toYearLabel);

    return {
      expectedSettlement: {
        targetMonth: selectedMonthLabel,
        nextSettlementDate: '2026-07-15', // 고정 정산일 매달 15일로 가정
        expectedAmount: pendingAmount,
        totalSalesAmount: pendingAmount + serviceFee + vatAmount,
        serviceFee,
        vatAmount,
      },
      monthlySalesHistory: {
        selectedMonthLabel,
        isMonthDropdownOpen,
        monthOptions,
        sales: mappedSalesItems,
        pagination: {
          currentPage: monthlySalesRawData?.pagination.page ?? 1,
          totalPages: monthlySalesRawData?.pagination.total_pages ?? 1,
          totalCount: monthlySalesRawData?.pagination.total ?? 0,
          hasNextPage: monthlySalesRawData?.pagination.has_next ?? false,
        },
      },
      totalSettlementAmount: {
        year: selectedYear,
        totalAccumulatedAmount,
        monthlySettlements: [],
        selectedYearLabel: toYearLabel(selectedYear),
        yearOptions: dynamicYearOptions,
        isYearDropdownOpen,
      },
      settlementAccountInfo,
    };
  }, [
    selectedMonthLabel,
    isMonthDropdownOpen,
    monthOptions,
    mappedSalesItems,
    monthlySalesRawData,
    pendingAmountRawData,
    yearlySalesData,
    selectedYear,
    isYearDropdownOpen,
    settlementAccountInfo,
  ]);

  // 핸들러 함수들
  const handleEditAccount = () => {
    setShowSellerInfoEditView(true);
  };

  const handleSellerInfoEditSubmit = (_data: SellerInfoEditFormData) => {
    setShowSellerInfoEditView(false);
  };

  const handleMonthOptionClick = (option: string) => {
    // "2026년 6월" 문자열에서 연도와 월 추출
    const match = option.match(/(\d+)년\s+(\d+)월/);
    if (match) {
      setSelectedYear(Number(match[1]));
      setSelectedMonth(Number(match[2]));
      setCurrentPage(1); // 월 변경 시 페이지 초기화
    }
    setIsMonthDropdownOpen(false);
  };

  // 판매자 승인 대기 중
  if (isSellerApprovalPending) {
    return <SellerApprovalPending />;
  }

  // 판매자 등록 완료 상태 시 화면 렌더링
  if (isSellerRegistered) {
    if (showSellerInfoEditView) {
      return (
        <SellerInfoEditForm
          initialData={{
            sellerType: toEditFormSellerType(accountDetail),
            name: accountDetail?.name,
            birthDate: accountDetail?.birthDate,
            businessNumber: accountDetail?.businessNumber,
            representativeName: accountDetail?.representativeName,
            companyName: accountDetail?.companyName,
            businessLicenseUrl: accountDetail?.businessLicenseUrl,
            bank: settlementAccountInfo.bank,
            accountNumber: settlementAccountInfo.accountNumber,
            holderName: settlementAccountInfo.holderName,
            isTermsAgreed: true,
          }}
          onSubmit={handleSellerInfoEditSubmit}
          onCancel={() => setShowSellerInfoEditView(false)}
        />
      );
    }

    if (showMonthlySalesDetailView) {
      return (
        <MonthlySalesHistorySection
          data={settlementDashboardData.monthlySalesHistory}
          onClickViewMore={() => setShowMonthlySalesDetailView(false)}
          onClickMonthSelect={() => setIsMonthDropdownOpen((prev) => !prev)}
          onClickMonthOption={handleMonthOptionClick}
          isDetailView={true}
          onClickUploadPrompt={() => navigate('/create')}
        />
      );
    }

    return (
      <SellerSettlementDashboard
        data={settlementDashboardData}
        onClickViewMore={() => setShowMonthlySalesDetailView(true)}
        onClickMonthSelect={() => setIsMonthDropdownOpen((prev) => !prev)}
        onClickMonthOption={handleMonthOptionClick}
        onClickYearSelect={() => setIsYearDropdownOpen((prev) => !prev)}
        onClickYearOption={(option) => {
          const parsedYear = parseYearLabel(option);
          if (!Number.isNaN(parsedYear)) {
            setSelectedYear(parsedYear);
          }
          setIsYearDropdownOpen(false);
        }}
        onClickEditAccount={handleEditAccount}
        onClickUploadPrompt={() => navigate('/create')}
      />
    );
  }

  if (showRegistrationForm) {
    return (
      <SellerRegistrationForm
        onSubmit={() => {
          setShowRegistrationForm(false);
        }}
      />
    );
  }

  return <SellerNotRegistered onRegisterClick={() => setShowRegistrationForm(true)} />;
};

export default DashboardTabContent;
