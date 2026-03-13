import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MonthlySaleItem, MonthlySettlement, SettlementAccountInfoSectionData } from '@/types/MyPage/settlement';
import type { SellerInfoEditFormData } from '@/types/MyPage/sellerInfo';
import type { SellerSettlementDashboardData } from './SellerSettlementDashboard';
import SellerSettlementDashboard from './SellerSettlementDashboard';
import SellerApprovalPending from './SellerApprovalPending';
import SellerNotRegistered from './SellerNotRegistered';
import SellerRegistrationForm from './SellerRegistrationForm';
import SellerInfoEditForm from './SellerInfoEditForm';
import MonthlySalesHistorySection from './settlement/MonthlySalesHistorySection';

const THUMBNAIL_IMAGE = 'http://localhost:3845/assets/5dbfecdc6cc3deee5512c688789a5fb79b5d117c.png';
const MOCK_SELLER_REGISTERED_AT = '2025-11-01';

const toMonthLabel = (date: Date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
const toYearLabel = (year: number) => `${year}년`;
const parseYearLabel = (label: string) => Number(label.replace('년', '').trim());

const parseSaleDate = (rawDate: string) => {
  const normalized = rawDate.replace(/\./g, '-');
  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
};

const buildMonthOptionsSince = (registeredAt: string) => {
  const registeredDate = new Date(registeredAt);
  const now = new Date();

  if (Number.isNaN(registeredDate.getTime())) {
    return [toMonthLabel(now)];
  }

  const cursor = new Date(registeredDate.getFullYear(), registeredDate.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthLabels: string[] = [];

  while (cursor <= end) {
    monthLabels.push(toMonthLabel(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  // 최근 월이 상단에 오도록 역순 정렬
  return monthLabels.reverse();
};

const getLatestSaleMonthLabel = (sales: MonthlySaleItem[]) => {
  const latestSaleDate = sales.reduce<Date | null>((latest, sale) => {
    const parsed = parseSaleDate(sale.saleDate);

    if (!parsed) {
      return latest;
    }

    if (!latest || parsed > latest) {
      return parsed;
    }

    return latest;
  }, null);

  return latestSaleDate ? toMonthLabel(latestSaleDate) : null;
};

interface DashboardTabContentProps {
  sellerStatusFromQuery: string | null;
}

const DashboardTabContent = ({ sellerStatusFromQuery }: DashboardTabContentProps) => {
  const navigate = useNavigate();

  // 판매자 상태 관리
  const [isSellerRegistered, setIsSellerRegistered] = useState(true);
  const [isSellerApprovalPending, setIsSellerApprovalPending] = useState(sellerStatusFromQuery === 'pending');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Dashboard UI 상태 관리
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedMonthLabel, setSelectedMonthLabel] = useState('');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showMonthlySalesDetailView, setShowMonthlySalesDetailView] = useState(false);
  const [showSellerInfoEditView, setShowSellerInfoEditView] = useState(false);
  const [settlementAccountInfo, setSettlementAccountInfo] = useState<SettlementAccountInfoSectionData>({
    bank: 'KOOKMIN',
    accountNumber: '1234567890',
    holderName: '홍길동',
  });

  useEffect(() => {
    setIsSellerApprovalPending(sellerStatusFromQuery === 'pending');
  }, [sellerStatusFromQuery]);

  const handleEditAccount = () => {
    setShowSellerInfoEditView(true);
  };

  const handleSellerInfoEditSubmit = (data: SellerInfoEditFormData) => {
    setSettlementAccountInfo({
      bank: data.bank,
      accountNumber: data.accountNumber,
      holderName: data.holderName,
    });
    setShowSellerInfoEditView(false);
  };

  const monthlySales = useMemo<MonthlySaleItem[]>(() => {
    return [
      {
        purchaseId: 1023,
        promptId: 45,
        title: '동양풍 일러스트 이미지 생성 프롬프트동양풍 일러스트 이미지 생성동양풍 일러스트 이미지 생성',
        saleDate: '2024.05.15',
        price: 12000,
        status: 'COMPLETED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
      {
        purchaseId: 1024,
        promptId: 45,
        title: '동양풍 일러스트 이미지 생성 프롬프트',
        saleDate: '2024.05.15',
        price: 1000,
        status: 'REFUNDED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
      {
        purchaseId: 1025,
        promptId: 47,
        title: '동양풍 일러스트 이미지 생성 프롬프트',
        saleDate: '2024.05.15',
        price: 1000,
        status: 'COMPLETED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
      {
        purchaseId: 1026,
        promptId: 48,
        title: '비즈니스 이메일 작성 프롬프트',
        saleDate: '2024.05.20',
        price: 8500,
        status: 'COMPLETED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
      {
        purchaseId: 1027,
        promptId: 49,
        title: '마케팅 카피라이팅 프롬프트',
        saleDate: '2025.12.22',
        price: 11000,
        status: 'COMPLETED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
      {
        purchaseId: 1028,
        promptId: 50,
        title: 'SNS 콘텐츠 기획 프롬프트',
        saleDate: '2025.12.25',
        price: 9500,
        status: 'REFUNDED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
      {
        purchaseId: 1029,
        promptId: 51,
        title: 'SNS 콘텐츠 캘린더 생성 프롬프트',
        saleDate: '2025.11.18',
        price: 7500,
        status: 'COMPLETED',
        thumbnailUrl: THUMBNAIL_IMAGE,
      },
    ];
  }, []);

  // 드롭다운: 판매자 등록일 이후 월 전체 노출
  const monthOptions = useMemo(() => buildMonthOptionsSince(MOCK_SELLER_REGISTERED_AT), []);
  // 기본 선택: 가장 최근 판매 월 (없으면 이번 달)
  const defaultMonthLabel = useMemo(() => {
    const latestSaleMonthLabel = getLatestSaleMonthLabel(monthlySales);

    if (latestSaleMonthLabel && monthOptions.includes(latestSaleMonthLabel)) {
      return latestSaleMonthLabel;
    }

    return monthOptions[0] ?? toMonthLabel(new Date());
  }, [monthOptions, monthlySales]);

  useEffect(() => {
    if (!selectedMonthLabel) {
      setSelectedMonthLabel(defaultMonthLabel);
      return;
    }

    if (!monthOptions.includes(selectedMonthLabel)) {
      setSelectedMonthLabel(defaultMonthLabel);
    }
  }, [defaultMonthLabel, monthOptions, selectedMonthLabel]);

  const monthlySettlementsByYear: Record<number, MonthlySettlement[]> = {
    2023: [
      { month: 1, amount: 12000 },
      { month: 2, amount: 15500 },
      { month: 3, amount: 18200 },
      { month: 4, amount: 11800 },
      { month: 5, amount: 9500 },
      { month: 6, amount: 14300 },
      { month: 7, amount: 16700 },
      { month: 8, amount: 13900 },
      { month: 9, amount: 10200 },
      { month: 10, amount: 8600 },
      { month: 11, amount: 7500 },
      { month: 12, amount: 7000 },
    ],
    2024: [
      { month: 1, amount: 22000 },
      { month: 2, amount: 25500 },
      { month: 3, amount: 28200 },
      { month: 4, amount: 21800 },
      { month: 5, amount: 19500 },
      { month: 6, amount: 24300 },
      { month: 7, amount: 26700 },
      { month: 8, amount: 23900 },
      { month: 9, amount: 20200 },
      { month: 10, amount: 28600 },
      { month: 11, amount: 27500 },
      { month: 12, amount: 18300 },
    ],
    2025: [
      { month: 1, amount: 35500 },
      { month: 2, amount: 35500 },
      { month: 3, amount: 35500 },
      { month: 4, amount: 35500 },
      { month: 5, amount: 35500 },
      { month: 6, amount: 35500 },
      { month: 7, amount: 35500 },
      { month: 8, amount: 35500 },
      { month: 9, amount: 35500 },
      { month: 10, amount: 35500 },
      { month: 11, amount: 35500 },
      { month: 12, amount: 35500 },
    ],
    2026: [],
  };

  const yearOptions = Object.keys(monthlySettlementsByYear)
    .map(Number)
    .sort((a, b) => b - a)
    .map(toYearLabel);
  const selectedYearLabel = toYearLabel(selectedYear);

  const selectedYearMonthlySettlements = monthlySettlementsByYear[selectedYear] ?? [];
  const totalAccumulatedAmount = selectedYearMonthlySettlements.reduce((sum, item) => sum + item.amount, 0);

  const settlementDashboardData: SellerSettlementDashboardData = {
    expectedSettlement: {
      targetMonth: '2026년 2월',
      nextSettlementDate: '2026-03-15',
      expectedAmount: 10,
      totalSalesAmount: 100,
      serviceFee: 10,
      vatAmount: 1,
    },
    monthlySalesHistory: {
      selectedMonthLabel,
      isMonthDropdownOpen,
      monthOptions,
      sales: monthlySales,
      pagination: {
        currentPage: 1,
        totalPages: 2,
        totalCount: monthlySales.length,
        hasNextPage: true,
      },
    },
    totalSettlementAmount: {
      year: selectedYear,
      totalAccumulatedAmount,
      monthlySettlements: selectedYearMonthlySettlements,
      selectedYearLabel,
      yearOptions,
      isYearDropdownOpen,
    },
    settlementAccountInfo,
  };

  // 판매자 승인 대기 중
  if (isSellerApprovalPending) {
    return <SellerApprovalPending />;
  }

  // 판매자 등록 완료
  if (isSellerRegistered) {
    // 판매자 정보 수정 보기
    if (showSellerInfoEditView) {
      return (
        <SellerInfoEditForm
          initialData={{
            sellerType: 'individual',
            name: settlementAccountInfo.holderName,
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

    // 월별 판매 내역 상세 보기
    if (showMonthlySalesDetailView) {
      return (
        <MonthlySalesHistorySection
          data={settlementDashboardData.monthlySalesHistory}
          onClickViewMore={() => setShowMonthlySalesDetailView(false)}
          onClickMonthSelect={() => setIsMonthDropdownOpen((prev) => !prev)}
          onClickMonthOption={(option) => {
            setSelectedMonthLabel(option);
            setIsMonthDropdownOpen(false);
          }}
          isDetailView={true}
          onClickUploadPrompt={() => navigate('/create')}
        />
      );
    }

    // 대시보드 메인 뷰
    return (
      <SellerSettlementDashboard
        data={settlementDashboardData}
        onClickViewMore={() => setShowMonthlySalesDetailView(true)}
        onClickMonthSelect={() => setIsMonthDropdownOpen((prev) => !prev)}
        onClickMonthOption={(option) => {
          setSelectedMonthLabel(option);
          setIsMonthDropdownOpen(false);
        }}
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

  // 판매자 등록 폼
  if (showRegistrationForm) {
    return (
      <SellerRegistrationForm
        onSubmit={(data) => {
          if (data.sellerType === 'business') {
            setIsSellerApprovalPending(true);
            setIsSellerRegistered(false);
          } else {
            setIsSellerApprovalPending(false);
            setIsSellerRegistered(true);
          }
          setShowRegistrationForm(false);
        }}
      />
    );
  }

  // 판매자 미등록 상태
  return <SellerNotRegistered onRegisterClick={() => setShowRegistrationForm(true)} />;
};

export default DashboardTabContent;
