// 사용처: src/pages/MyPage/components/settlement/ExpectedSettlementSection.tsx
// API 날짜 문자열(YYYY-MM-DD)을 정산일 표시 문구로 변환합니다.
export const formatNextSettlementDate = (rawDate: string) => {
  const parsed = new Date(rawDate);

  if (Number.isNaN(parsed.getTime())) {
    return `다음 정산일: ${rawDate}`;
  }

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  const weekday = weekdays[parsed.getDay()];

  return `다음 정산일: ${year}.${month}.${day} (${weekday})`;
};

// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
// 판매일 문자열(YYYY.MM.DD)을 월 라벨(YYYY년 M월)로 변환합니다.
export const toMonthLabelFromSaleDate = (saleDate: string) => {
  const normalized = saleDate.replace(/\./g, '-');
  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return `${parsed.getFullYear()}년 ${parsed.getMonth() + 1}월`;
};
