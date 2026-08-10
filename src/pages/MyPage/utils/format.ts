// 사용처: src/pages/MyPage/components/settlement/MonthlySalesHistorySection.tsx
// 숫자 금액을 한국 원화 표기 문자열로 변환합니다.
export const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;
