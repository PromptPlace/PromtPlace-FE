import type {
  MonthlySales,
  MonthlySalesHistorySectionData,
  MonthlySaleItem,
  PendingAmount,
  ExpectedSettlementSectionData,
  Account,
  SettlementAccountInfoSectionData,
} from '@/types/MyPage/settlement';

const THUMBNAIL_FALLBACK = 'http://localhost:3845/assets/5dbfecdc6cc3deee5512c688789a5fb79b5d117c.png';

// 월별 판매 내역 컴포넌트 구조에 따라 변환
export const mapToMonthlySalesHistory = (
  apiData: MonthlySales,
  context: { selectedMonthLabel: string; monthOptions: string[]; isMonthDropdownOpen: boolean },
): MonthlySalesHistorySectionData => {
  const sales: MonthlySaleItem[] = apiData.items.map((item) => ({
    purchaseId: item.settlement_id,
    promptId: item.prompt_id,
    thumbnailUrl: THUMBNAIL_FALLBACK, // API에 썸네일 필드가 없을 경우 폴백 처리
    title: item.prompt_title,
    saleDate: item.sold_at.split('T')[0].replace(/-/g, '.'), // '2026-06-28' -> '2026.06.28'
    price: item.sale_price,
    status: item.status === 'Refunded' ? 'REFUNDED' : 'COMPLETED',
  }));

  return {
    selectedMonthLabel: context.selectedMonthLabel,
    monthOptions: context.monthOptions,
    isMonthDropdownOpen: context.isMonthDropdownOpen,
    sales,
    pagination: {
      currentPage: apiData.pagination.page,
      totalPages: apiData.pagination.total_pages,
      totalCount: apiData.pagination.total,
      hasNextPage: apiData.pagination.has_next,
    },
  };
};

// 정산 예정 금액 컴포넌트 구조에 맞게 변환
export const mapToExpectedSettlement = (
  apiData: PendingAmount,
  targetMonthLabel: string,
): ExpectedSettlementSectionData => {
  // 수수료 및 VAT 계산 로직->백엔드에 따라 ㅅ정 핑ㄹ요
  const expectedAmount = apiData.pending_amount;
  const serviceFee = Math.round(expectedAmount * 0.1); // 수수료 10%?
  const vatAmount = Math.round(serviceFee * 0.1); // 수수료의 10%?

  return {
    targetMonth: targetMonthLabel,
    nextSettlementDate: '2026-07-15', // 매월 15일 고정 스펙일 경우 대입
    expectedAmount,
    totalSalesAmount: expectedAmount + serviceFee + vatAmount,
    serviceFee,
    vatAmount,
  };
};

// 결제 계좌 정보 컴포넌트 구조에 따라 변환
export const mapToSettlementAccount = (apiData: Account): SettlementAccountInfoSectionData => {
  return {
    bank: apiData.bank,
    accountNumber: apiData.accountNumber,
    holderName: apiData.holderName,
  };
};
