import type { ReactNode } from 'react';

export type SellerRegistrationModalType =
  | 'verificationSuccess'
  | 'nameMismatch'
  | 'bankAccountMismatch'
  | 'accountNotFound'
  | 'accountUnavailable'
  | 'unsupportedAccountType'
  | 'bankCommunicationError'
  | 'bankMaintenanceTime'
  | 'dailyVerificationLimitExceeded'
  | 'individualRegistrationComplete'
  | 'businessRegistrationComplete';

export interface SellerRegistrationModalContent {
  title: string;
  description?: string;
  actionLabel?: string;
}

export interface SellerRegistrationModalFrameProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  customContent?: ReactNode;
}

export interface SellerRegistrationStatusModalProps {
  modalType: SellerRegistrationModalType | null;
  onClose: () => void;
  onAction?: () => void;
}

// 사용처: src/pages/MyPage/components/settlement/ExpectedSettlementSection.tsx
// 정산 예정 금액 카드 API 응답 데이터 형태입니다.
export interface ExpectedSettlementSectionData {
  targetMonth: string;
  nextSettlementDate: string;
  expectedAmount: number;
  totalSalesAmount: number;
  serviceFee: number;
  vatAmount: number;
}

// 사용처: src/pages/MyPage/components/settlement/ExpectedSettlementSection.tsx
export interface ExpectedSettlementSectionProps {
  data: ExpectedSettlementSectionData;
  onClickGuideLink?: () => void;
}

// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
// 월별 판매 내역 API의 결제 상태 값입니다.
export type MonthlySaleStatus = 'COMPLETED' | 'REFUNDED';

// 사용처: 월별 판매 내역 조회 API 호출 시 쿼리 파라미터
// GET /api/settlements/sales-history?year=2026&month=1&page=1
export interface MonthlySalesHistoryQueryParams {
  year: number;
  month: number;
  page?: number;
}

// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
// 월별 판매 내역 API의 개별 판매 항목입니다.
export interface MonthlySaleItem {
  purchaseId: number;
  promptId: number;
  thumbnailUrl: string;
  title: string;
  saleDate: string;
  price: number;
  status: MonthlySaleStatus;
}

// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
// 월별 판매 내역 API의 페이지네이션 정보입니다.
export interface MonthlySalesPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
}

// 사용처: 월별 판매 내역 조회 API 응답의 data 필드
export interface MonthlySalesHistoryApiData {
  sales: MonthlySaleItem[];
  pagination: MonthlySalesPagination;
}

// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
// 월별 판매 내역 섹션에서 사용하는 API 기반 데이터 형태입니다.
export interface MonthlySalesHistorySectionData {
  selectedMonthLabel: string;
  monthOptions?: string[];
  isMonthDropdownOpen?: boolean;
  sales: MonthlySalesHistoryApiData['sales'];
  pagination: MonthlySalesHistoryApiData['pagination'];
}

// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
export interface MonthlySalesHistorySectionProps {
  data: MonthlySalesHistorySectionData;
  onClickViewMore?: () => void;
  onClickMonthSelect?: () => void;
  onClickMonthOption?: (option: string) => void;
  isDetailView?: boolean;
  onClickUploadPrompt?: () => void;
}

// 사용처: src/pages/MyPage/components/settlement/TotalSettlementAmountSection.tsx
// 월별 누적 정산 API의 월별 정산 항목입니다.
export interface MonthlySettlement {
  month: number;
  amount: number;
}

// 사용처: 총 누적 정산 금액 조회 API 응답의 data 필드
export interface TotalSettlementAmountApiData {
  year: number;
  totalAccumulatedAmount: number;
  monthlySettlements: MonthlySettlement[];
}

// 사용처: 총 누적 정산 금액 조회 API 호출 시 쿼리 파라미터
// GET /api/settlements/total-accumulated?year=2025
export interface TotalSettlementAmountQueryParams {
  year: number;
}

// 사용처: src/pages/MyPage/components/settlement/TotalSettlementAmountSection.tsx
// 총 누적 정산 금액 섹션에서 사용하는 API 기반 데이터 형태입니다.
export interface TotalSettlementAmountSectionData extends TotalSettlementAmountApiData {
  selectedYearLabel: string;
  yearOptions?: string[];
  isYearDropdownOpen?: boolean;
  isEmpty?: boolean;
}

// 사용처: src/pages/MyPage/components/settlement/TotalSettlementAmountSection.tsx
export interface TotalSettlementAmountSectionProps {
  data: TotalSettlementAmountSectionData;
  onClickYearSelect?: () => void;
  onClickYearOption?: (option: string) => void;
}
